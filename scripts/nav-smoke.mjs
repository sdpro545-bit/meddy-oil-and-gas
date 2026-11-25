import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const MODE = process.env.TEST_MODE || "dev";
const REPORT_PATH = path.resolve("qa/nav-report.json");
const FAIL_DIR = path.resolve("qa/nav-failures");

const SERVICE_SLUGS = [
  "well-construction",
  "oil-field-services",
  "integrated-services",
  "fpso-and-vessel-services",
  "power",
];

const ROUTES = [
  "/",
  "/about",
  "/services",
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  "/projects",
  "/qhse",
  "/careers",
  "/contact",
  "/privacy",
  "/does-not-exist",
];

const HEADER_ROUTES = ["/", "/about", "/services", "/projects", "/qhse", "/careers", "/contact"];

async function collectRun(page, label, fn, { allow404 = false } = {}) {
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  const httpErrors = [];
  let mainStatus = null;

  const onPageError = (err) => pageErrors.push(String(err?.stack || err));
  const onConsole = (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  };
  const onReqFailed = (req) => {
    const failure = req.failure()?.errorText || "failed";
    if (failure === "net::ERR_ABORTED") return;
    failedRequests.push({ url: req.url(), failure });
  };
  const onResponse = (res) => {
    if (res.request().isNavigationRequest() && res.url().startsWith(BASE_URL)) {
      mainStatus = res.status();
    }
    if (res.status() >= 400 && !(allow404 && res.status() === 404)) {
      httpErrors.push({ url: res.url(), status: res.status() });
    }
  };

  page.on("pageerror", onPageError);
  page.on("console", onConsole);
  page.on("requestfailed", onReqFailed);
  page.on("response", onResponse);

  let h1Visible = false;
  let h1Text = "";
  let nextOverlayText = "";
  let actionError = null;

  try {
    await fn();
    const h1 = page.locator("h1").first();
    await h1.waitFor({ state: "visible", timeout: 5000 });
    h1Visible = await h1.isVisible();
    h1Text = (await h1.innerText()).trim();
    await page.waitForTimeout(250);
  } catch (err) {
    actionError = String(err?.message || err);
  }

  try {
    const portal = page.locator("nextjs-portal");
    if ((await portal.count()) > 0) {
      nextOverlayText = await portal.evaluate((el) => {
        const root = el.shadowRoot || el;
        const dialog = root.querySelector("[data-nextjs-dialog-body], [data-nextjs-toast-errors], [data-nextjs-error-overlay-nav]");
        if (!dialog) return "";
        return (dialog.textContent || "").replace(/\s+/g, " ").trim().slice(0, 500);
      });
    }
  } catch {}

  const relevantConsoleErrors = allow404
    ? consoleErrors.filter((t) => !t.includes("404 (Not Found)"))
    : consoleErrors;

  const hasFailure =
    !h1Visible ||
    pageErrors.length > 0 ||
    relevantConsoleErrors.length > 0 ||
    failedRequests.length > 0 ||
    httpErrors.length > 0 ||
    Boolean(nextOverlayText) ||
    Boolean(actionError);

  let screenshot = null;
  if (hasFailure) {
    await fs.mkdir(FAIL_DIR, { recursive: true });
    const safe = label.replace(/[^a-zA-Z0-9_-]/g, "_");
    screenshot = path.join(FAIL_DIR, `${MODE}-${safe}.png`);
    await page.screenshot({ path: screenshot, fullPage: true }).catch(() => {});
  }

  page.off("pageerror", onPageError);
  page.off("console", onConsole);
  page.off("requestfailed", onReqFailed);
  page.off("response", onResponse);

  return {
    label,
    url: page.url(),
    status: mainStatus,
    h1Visible,
    h1Text,
    pageErrors,
    consoleErrors: relevantConsoleErrors,
    failedRequests,
    httpErrors,
    nextOverlayText,
    actionError,
    screenshot,
    passed: !hasFailure,
  };
}

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const results = [];

  // 1. Direct loads (desktop)
  console.log(`[${MODE}] Running direct loads...`);
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => {
      sessionStorage.setItem("meddy_intro_v2", "1");
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    for (const route of ROUTES) {
      const res = await collectRun(
        page,
        `direct_${route}`,
        async () => {
          await page.goto(`${BASE_URL}${route}`, { waitUntil: "load", timeout: 30000 });
        },
        { allow404: route === "/does-not-exist" }
      );
      results.push({ type: "direct", route, ...res });
      console.log(`  direct ${route}: passed=${res.passed} status=${res.status} h1=${res.h1Visible}`);
    }
    await context.close();
  }

  // 2. Client-side clicks from Home header (desktop)
  console.log(`[${MODE}] Running home header clicks...`);
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => {
      sessionStorage.setItem("meddy_intro_v2", "1");
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    for (const route of HEADER_ROUTES) {
      const res = await collectRun(page, `home_header_${route}`, async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 20000 });
        await page.waitForTimeout(200);
        const link = page.locator(`header nav a[href="${route}"]`).first();
        await link.click();
        await page.waitForURL((u) => new URL(u).pathname === route, { timeout: 15000 });
      });
      results.push({ type: "home_header", route, ...res });
      console.log(`  home_header ${route}: passed=${res.passed}`);
    }
    // Also test desktop Services dropdown sub-links
    for (const slug of SERVICE_SLUGS) {
      const route = `/services/${slug}`;
      const res = await collectRun(page, `home_dropdown_${route}`, async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 20000 });
        await page.waitForTimeout(300);
        const servicesNav = page.locator(`header nav a[href="/services"]`).first();
        await servicesNav.hover();
        const link = page.locator(`header nav a[href="${route}"]`).first();
        try {
          await link.waitFor({ state: "visible", timeout: 1500 });
        } catch {
          await servicesNav.hover({ force: true });
          await link.waitFor({ state: "visible", timeout: 3000 });
        }
        await link.click();
        await page.waitForURL((u) => new URL(u).pathname === route, { timeout: 15000 });
      });
      results.push({ type: "home_dropdown", route, ...res });
      console.log(`  home_dropdown ${route}: passed=${res.passed}`);
    }
    await context.close();
  }

  // 3. Client-side clicks from deep page (/about) header (desktop)
  console.log(`[${MODE}] Running deep page (/about) header clicks...`);
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => {
      sessionStorage.setItem("meddy_intro_v2", "1");
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    for (const route of HEADER_ROUTES) {
      const res = await collectRun(page, `deep_header_${route}`, async () => {
        await page.goto(`${BASE_URL}/about`, { waitUntil: "load", timeout: 20000 });
        await page.waitForTimeout(200);
        const link = page.locator(`header nav a[href="${route}"]`).first();
        await link.click();
        await page.waitForURL((u) => new URL(u).pathname === route, { timeout: 15000 });
      });
      results.push({ type: "deep_header", route, ...res });
      console.log(`  deep_header ${route}: passed=${res.passed}`);
    }
    await context.close();
  }

  // 4. Mobile menu (390px wide)
  console.log(`[${MODE}] Running mobile menu clicks...`);
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addInitScript(() => {
      sessionStorage.setItem("meddy_intro_v2", "1");
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    for (const route of HEADER_ROUTES) {
      const res = await collectRun(page, `mobile_menu_${route}`, async () => {
        await page.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 20000 });
        await page.waitForTimeout(200);
        const menuBtn = page.locator("header button[aria-controls='mobile-menu']").first();
        await menuBtn.click();
        await page.locator("#mobile-menu").waitFor({ state: "visible", timeout: 3000 });
        if (route === "/services") {
          const accBtn = page.locator("#mobile-menu button:has-text('Services')").first();
          await accBtn.click();
          const link = page.locator(`#mobile-menu a[href="/services"]`).first();
          await link.click({ timeout: 3000 });
        } else {
          const link = page.locator(`#mobile-menu a[href="${route}"]`).first();
          await link.click({ timeout: 3000 });
        }
        await page.waitForURL((u) => new URL(u).pathname === route, { timeout: 15000 });
      });
      results.push({ type: "mobile_menu", route, ...res });
      console.log(`  mobile_menu ${route}: passed=${res.passed}`);
    }
    await context.close();
  }

  await browser.close();

  const summary = {
    mode: MODE,
    baseUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    total: results.length,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => !r.passed).length,
    failures: results.filter((r) => !r.passed),
    results,
  };

  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  } catch {}
  existing[MODE] = summary;
  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await fs.writeFile(REPORT_PATH, JSON.stringify(existing, null, 2));

  console.log(`[${MODE}] Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);
  for (const f of summary.failures) {
    console.log(`FAIL ${f.label}: h1=${f.h1Visible}, pageErrors=${f.pageErrors.length}, consoleErrors=${f.consoleErrors.length}, httpErrors=${f.httpErrors.length}, actionError=${f.actionError}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
