# Meddy Oil & Gas: image generation prompt pack

Use with Gemini (Nano Banana or Imagen), ChatGPT image, Midjourney, or Flux. Every prompt is written in plain language so it works in any of them.

## How to use this pack

1. Paste the **BRAND BLOCK** and **ACCURACY BLOCK** (Section 1) before every image prompt.
2. Paste the image prompt from Section 3.
3. Paste the **NEGATIVE BLOCK** (Section 1) at the end. In tools without a negative field, add it as "Avoid: ...".
4. Generate at the largest size the tool allows. Aspect ratio matters more than pixel count. Upscale to the master size in the table, then export with the script in Section 6.
5. **Never ask the AI to draw the Meddy logo.** Generators distort it. Every prompt leaves a blank patch. You add the real logo file afterwards (Section 4).
6. Run the QA list in Section 5 before an image goes into the site.

---

## 1. Shared blocks (paste with every prompt)

### BRAND BLOCK

```
Brand look for Meddy Oil & Gas Limited, a Nigerian oil and gas services company.
Colour grade: cool deep-blue shadows (#164882, #1A5891), warm orange and amber
highlights (#F69E28, #FCB424), clean teal sky tones (#7CC1D0), slightly desaturated,
natural contrast. Orange is the only strong accent colour. No purple, no pink, no neon.
Lighting: soft golden hour or clean overcast with a warm orange edge light, one
consistent light direction from the left.
Camera: documentary photography, 35mm to 85mm lens, shallow to medium depth of field,
natural film grain, true skin texture.
Uniform standard for every person: navy flame resistant coverall (#164882) with
silver reflective tape and thin orange (#F69E28) piping, a blank rectangular
chest patch on the left chest, white or orange (#F69E28) hard hat with a blank
circular patch on the front, steel toe boots, work gloves where hands are shown.
All patches are completely blank. No logo, no text anywhere.
```

### ACCURACY BLOCK

```
People: Nigerian men and women, varied ages and builds, natural expressions, real
working posture. No posed thumbs up, no staged laughing at tablets, no stock photo
smiles. Hands must have five correct fingers, teeth natural, eyes aligned, ears
symmetrical.
PPE must be correct: hard hat with chin strap, clear safety glasses, hearing
protection where noise is present, gloves, steel toe boots, flame resistant coverall
with reflective tape. Offshore scenes add a life jacket.
Setting must be unmistakably oil and gas in coastal Nigeria: Gulf of Guinea or Niger
Delta horizon, tropical vegetation, humid hazy light. No snow, no desert canyons, no
North Sea weather, no Texas look.
Equipment must look real: correct pipe, valve, flange, wellhead, and rig geometry.
All equipment, vehicles, vessels, pipes, containers, and signs are plain and unmarked.
There is no readable text, lettering, numbers, or brand names on anything in the frame.
Computer and tablet screens show abstract unreadable graphs only.
```

### NEGATIVE BLOCK

```
Avoid: any text, lettering, captions, labels, logos, watermarks, company names,
signs, extra fingers, deformed hands, warped faces, uneven teeth, plastic skin,
cartoon or 3D render look, stock photo smile, lens flare orbs, glowing particles,
neon, purple or pink tones, fog blobs, floating objects, retail warehouse, generic
cardboard boxes, AutoCAD screenshots, welding sparks close ups, tilted horizon.
```

---

## 2. Image inventory with sizes

Aspect ratios are fixed. "Master" is the upscaled working file. "Deliver" lists the widths exported for the site as AVIF (quality 55) and WebP (quality 78). Budgets are per file at the largest delivered width.

| # | File name | Used in | Aspect | Master px | Deliver widths (px) | Budget |
|---|---|---|---|---|---|---|
| 1 | `hero-desktop` | Home hero | 16:9 | 3840 by 2160 | 2560, 1920, 1280, 768 | 260 KB |
| 2 | `hero-mobile` | Home hero below 768px | 3:4 | 2250 by 3000 | 1170, 780 | 150 KB |
| 3 | `about-engineer` | Home About, About page | 4:5 | 2400 by 3000 | 1200, 800 | 140 KB |
| 4 | `about-tank` | Home About | 4:3 | 2400 by 1800 | 1200, 800 | 120 KB |
| 5 | `mission-team` | About page | 16:9 | 3840 by 2160 | 1920, 1280 | 200 KB |
| 6 | `qhse-banner` | QHSE band and page | 21:9 | 3840 by 1646 | 2560, 1600 | 200 KB |
| 7 | `qhse-banner-mobile` | QHSE band below 768px | 4:5 | 2400 by 3000 | 1080, 720 | 120 KB |
| 8 | `service-drilling` | Services | 4:3 | 2400 by 1800 | see crops below | 120 KB per crop |
| 9 | `service-well-construction` | Services | 4:3 | 2400 by 1800 | crops | 120 KB per crop |
| 10 | `service-wireline` | Services | 4:3 | 2400 by 1800 | crops | 120 KB per crop |
| 11 | `service-engineering` | Services | 4:3 | 2400 by 1800 | crops | 120 KB per crop |
| 12 | `service-procurement` | Services | 4:3 | 2400 by 1800 | crops | 120 KB per crop |
| 13 | `service-pipeline` | Services | 4:3 | 2400 by 1800 | crops | 120 KB per crop |
| 14 | `careers-banner` | Careers | 16:9 | 3840 by 2160 | 1920, 1280 | 180 KB |
| 15 to 17 | `service-integrated`, `service-fpso-vessel`, `service-power` | Optional, only if you adopt the Geoplex service set | 4:3 | 2400 by 1800 | crops | 120 KB per crop |

**Service crops (cut from each 4:3 master):**

| Crop | Size | Use |
|---|---|---|
| `-preview` | 4:5, 1200 by 1500 | Sticky hover preview in the Services list |
| `-hero` | 16:9, 1600 by 900 | Service detail page hero |
| `-thumb` | 4:3, 800 by 600 | Cards, mobile list, social |

Because three crops come from one frame, every service image must keep its subject inside the **centre 60%** of the frame.

**Not generated by AI (built in code):**

| File | Size | Source |
|---|---|---|
| `og-image` | 1200 by 630 | Logo icon on navy `#0B1E36`, typeset wordmark |
| Favicons, app icons | 16, 32, 180, 192, 512 | From `meddy-mark.png` |
| Hero blur placeholder | 24 px wide, inline data URI | Generated from each hero |

**Alt text (write exactly, no dashes):**

| File | Alt |
|---|---|
| hero-desktop | Offshore engineer in navy coveralls and a white hard hat on a platform deck |
| about-engineer | Field engineer in an orange hard hat reviewing a tablet beside process pipework |
| about-tank | Steel storage tank with a yellow access staircase |
| mission-team | Four engineers reviewing site drawings on a table |
| qhse-banner | Technicians holding a safety briefing at a tank farm at sunset |
| service-drilling | Drilling supervisor reviewing rig data on the rig floor |
| service-well-construction | Technicians checking flange bolts on a wellhead |
| service-wireline | Wireline equipment rigged up at a wellhead |
| service-engineering | Engineers reviewing process drawings in a site cabin |
| service-procurement | Storekeeper checking tubulars in an oilfield laydown yard |
| service-pipeline | Technician measuring pipe wall thickness at a valve station |
| careers-banner | Graduate engineers walking through a site with a supervisor |

---

## 3. The prompts

Each prompt below goes between the BRAND and ACCURACY blocks and the NEGATIVE block.

### 1. `hero-desktop` (16:9)

```
Cinematic documentary photograph. A Nigerian woman offshore engineer in her thirties
stands on the right third of the frame at a yellow steel deck railing, three quarter
view, calm confident expression, looking just past the camera. She wears the Meddy
uniform: navy coverall with silver reflective tape and orange piping, blank chest
patch, white hard hat with chin strap and a blank circular patch on the hat front,
orange ear defenders resting around her neck, clear safety glasses pushed up on the
hat, a handheld radio clipped to the chest. Behind her a Gulf of Guinea offshore
platform sits small on the horizon at the right.
Composition: the left 55% of the frame is calm sea and soft sky with very little
detail and a slightly darker tone, so white headline text reads over it. Horizon on
the upper third. Top 12% and bottom 18% of the frame are quiet. Subject's head sits
in the upper right quadrant. Warm orange edge light from the left, cool blue
shadows. 85mm lens, shallow depth of field, 16:9.
```

### 2. `hero-mobile` (3:4)

```
Same woman, same uniform and same light as the desktop hero, as a vertical portrait.
She is centred in the frame, chest up with the deck railing below, the platform
visible small and high behind her left shoulder. The top 35% of the frame is soft
sky and sea with little detail (for the header and headline). Her face sits in the
middle third. Hard hat front and left chest patch both clearly visible and blank.
Warm edge light from the left, 3:4 vertical.
```
Generate it in the same session as the desktop hero, using the desktop hero as a reference image, so it is the same person.

### 3. `about-engineer` (4:5)

```
Portrait of a Nigerian man in his forties with a short trimmed beard, field
engineer, wearing an orange (#F69E28) hard hat with a blank circular patch on the
front and a navy coverall with silver reflective tape and a blank chest patch on the
left chest. Clear safety glasses. He looks down at a rugged tablet in his hands with
a focused, relaxed expression. Behind him, out of focus, oilfield process pipework
and a drilling mast under a late afternoon sky. Warm side light from the left.
Subject fills the lower two thirds of the frame, upper third is sky. 50mm lens, 4:5.
```

### 4. `about-tank` (4:3)

```
A large cylindrical steel storage tank with a spiral yellow access staircase and
yellow safety railings, seen from a low angle against a clear deep blue sky, coastal
West Africa, clean industrial setting, slight haze, palm trees at the very edge of
the frame. No people. The tank is unmarked with no lettering. Wide angle, 4:3.
```

### 5. `mission-team` (16:9)

```
Four Nigerian oil and gas engineers, two women and two men of different ages, stand
around a steel table in an open air site shelter reviewing printed drawings. The
drawings show only abstract lines, nothing readable. One points at a drawing, one
holds a tablet, two listen. Navy coveralls, white hard hats, blank patches. Tank
farm visible out of focus behind them. Soft overcast daylight with a warm orange rim
light. Natural, candid, not posed. 35mm lens, 16:9.
```

### 6. `qhse-banner` (21:9)

```
Wide cinematic shot of two Nigerian technicians, one man and one woman, doing a
pre-job safety check on pipework at a tank farm at sunset. Both in navy coveralls
and white hard hats with blank patches, one pointing along a pipe run, one holding a
clipboard with an unreadable page. Backs partly turned, faces in profile. Long
shadows, orange sunset sky at the right, cool blue shadows on the left, a tall flare
stack far in the distance. Subjects sit in the right third, left third is calm tank
farm and pipework with little detail for text. Anamorphic feel, 21:9.
```

### 7. `qhse-banner-mobile` (4:5)

```
Same two technicians and same sunset tank farm as the wide banner, framed vertically.
Both subjects in the lower two thirds, upper third is orange sunset sky with little
detail. Matching light and colour. 4:5.
```
Generate with the wide banner as a reference image.

### 8. `service-drilling` (4:3)

```
A Nigerian male drilling supervisor in his thirties, navy coverall, white hard hat
with blank patch, safety glasses, stands on a land rig floor at dawn reviewing rig
data on a rugged tablet. Drill pipe is racked behind him and the derrick rises out
of frame. Mist low on the ground, warm orange light from the left. Subject centred
in the middle 60% of the frame, medium shot, 4:3.
```

### 9. `service-well-construction` (4:3)

```
Two Nigerian technicians in navy coveralls, white hard hats with blank patches, and
gloves, crouch and stand at a land wellhead assembly with a valve tree, checking
flange bolts with a torque wrench. Clean steel, correct valve and flange geometry,
unmarked. Late morning light, tropical vegetation edge of frame. Subjects and
wellhead centred in the middle 60% of the frame, 4:3.
```

### 10. `service-wireline` (4:3)

```
A wireline intervention setup at a wellhead: a vertical lubricator stack and pressure
control equipment rigged up above the wellhead, a cable running to a truck mounted
unit. A Nigerian technician in navy coveralls and a white hard hat with blank patch
stands at the unit's control panel in the cabin doorway, looking at the stack.
Unmarked equipment, no lettering. Golden hour, 4:3, subject centred.
```

### 11. `service-engineering` (4:3)

```
Interior of a site cabin. A Nigerian woman engineer and a Nigerian man engineer, both
in navy coveralls with blank chest patches, hard hats on the table, review large
printed process drawings of abstract lines. Through the window behind them a
processing facility with flare stack in warm evening light. Practical room: radio,
water dispenser, steel shelves. Natural and unposed, 4:3, subjects centred.
```

### 12. `service-procurement` (4:3)

```
An oilfield laydown yard. Racks of steel casing and tubing joints, stacks of valves
and flanges on pallets, a yellow forklift in the background. A Nigerian storekeeper
in a navy coverall, white hard hat with blank patch and hi vis vest, checks a metal
tag on a pipe joint with a clipboard whose page is unreadable. Late afternoon light.
Clearly industrial oilfield, not a retail or parcel warehouse, no cardboard boxes.
Subject centred in the middle 60%, 4:3.
```

### 13. `service-pipeline` (4:3)

```
A technician, Nigerian woman in her thirties, navy coverall and orange hard hat with
blank patch, holds an ultrasonic thickness gauge against an above ground pipe at a
valve station. Pipeline runs away into grassland and mangrove edge of the Niger
Delta. Pipes and valves are plain steel with no lettering. Warm sunrise light from
the left, 4:3, subject centred.
```

### 14. `careers-banner` (16:9)

```
Three young Nigerian graduate engineers, two women and one man, in navy coveralls
and white hard hats with blank patches, walk through an oilfield site beside an older
Nigerian supervisor who is pointing out equipment. Candid mid stride, natural
conversation, no looking at camera. Pipework and a tank behind. Warm afternoon light.
Right half calm for text. 16:9.
```

### 15 to 17. Optional (only if you adopt the Geoplex service set)

**`service-integrated`**
```
Nigerian engineers at an operations room desk with several monitors showing abstract
unreadable graphs, a large wall screen with an abstract schematic, calm focused work,
navy shirts with blank chest patches, daylight from a side window. 4:3, centred.
```
**`service-fpso-vessel`**
```
An offshore support vessel alongside a floating production unit at sea in the Gulf of
Guinea, a Nigerian deck crew in navy coveralls and orange life jackets on the vessel
deck, golden hour. Vessel hull and unit are plain unmarked steel with no lettering.
4:3, vessel centred.
```
**`service-power`**
```
A gas fired power station in coastal Nigeria at dusk, turbine halls and exhaust stacks,
a Nigerian engineer in navy coverall and white hard hat with blank patch checking a
panel in the foreground, no lettering on any equipment. 4:3, centred.
```

---

## 4. Adding the real logo (two methods)

The source files are `assets/logo/meddy-mark.png` (1024 by 1024, transparent) and `meddy-mark-on-white-patch.png` (512 by 512, white rounded tile).

### Method A (recommended): composite in code

1. For each image, record the patch position in `assets/logo/placements.json`: x, y, width, rotation, and a skew value, for the left chest patch and the hard hat front.
2. Chest: logo width about 8% of the torso width. Hard hat: about 35 to 40% of the hat width.
3. Use `meddy-mark-on-white-patch.png` on the **navy** coverall and on the hard hat, so the deep blue part of the icon stays visible. Use `meddy-mark.png` directly on the **orange** coverall.
4. Warp to follow the fabric curve (perspective plus a gentle displacement), then blend in a copy of the underlying fabric texture at 10 to 15% opacity (soft light) so it reads as an embroidered or printed patch.
5. Match the logo's brightness to the scene, but **never change its hue, shape, or proportions**.
6. Zoom to 200% and check the edges. Any warp beyond natural curvature means redo the placement.

### Method B (quick): edit with the logo as a reference

Use only in a tool that accepts a reference image (Gemini or ChatGPT). Attach the generated photo and `meddy-mark.png`, then paste:

```
Edit the first image only by placing the logo from the second image on the blank
left chest patch and on the blank patch on the front of the hard hat. Reproduce the
logo exactly as supplied: same shapes, same orange, gold, teal and blue colours, same
proportions. Do not redraw, restyle, simplify, or add text. Scale the chest logo to
about 8% of the torso width and the hat logo to about 35% of the hat width. Follow the
fabric folds and the hat curvature and match the lighting. Change nothing else in
the photo.
```
Compare the result with the source file at 200%. If the shapes drift, use Method A.

**Known fault in the current build:** the hero woman's logo sits on her forehead below the hat brim, and her chest patch is empty. Regenerate and place it correctly.

---

## 5. QA checklist (every image)

* [ ] Nigerian subjects, natural, varied, not staged
* [ ] Hands, teeth, eyes, ears correct. Zoom to 200%.
* [ ] PPE correct for the scene (hard hat strap, glasses, gloves, boots, reflective tape)
* [ ] **No text anywhere in the frame**, no company names, no "Meddy Global Solutions"
* [ ] Equipment geometry plausible, unmarked
* [ ] Setting reads as coastal Nigeria oil and gas
* [ ] Colour grade matches the brand block (cool blue shadows, warm orange highlights)
* [ ] Light direction from the left, consistent across the set
* [ ] Subject inside the safe area (centre 60% for services, right third for hero)
* [ ] Logo placed per Section 4 and checked at 200%
* [ ] Under the file budget, alt text written, filename matches the table
* [ ] Logged in `docs/provenance.md` as AI generated, replace with real Meddy photography when available
* [ ] Never captioned with a person's name or job title

---

## 6. Export script (`scripts/export-images.mjs`)

```js
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

const fmts = [
  ["avif", { quality: 55, effort: 6 }],
  ["webp", { quality: 78 }],
];

// Full frame exports
const frames = [
  { src: "masters/hero-desktop.png", name: "hero-desktop", widths: [2560, 1920, 1280, 768] },
  { src: "masters/hero-mobile.png", name: "hero-mobile", widths: [1170, 780] },
  { src: "masters/about-engineer.png", name: "about-engineer", widths: [1200, 800] },
  { src: "masters/about-tank.png", name: "about-tank", widths: [1200, 800] },
  { src: "masters/mission-team.png", name: "mission-team", widths: [1920, 1280] },
  { src: "masters/qhse-banner.png", name: "qhse-banner", widths: [2560, 1600] },
  { src: "masters/qhse-banner-mobile.png", name: "qhse-banner-mobile", widths: [1080, 720] },
  { src: "masters/careers-banner.png", name: "careers-banner", widths: [1920, 1280] },
];

for (const f of frames) {
  for (const w of f.widths) {
    for (const [fmt, opts] of fmts) {
      await sharp(f.src).resize({ width: w }).toFormat(fmt, opts).toFile(`${OUT}/${f.name}-${w}.${fmt}`);
    }
  }
}

// Service crops from one 4:3 master
const services = [
  "drilling", "well-construction", "wireline",
  "engineering", "procurement", "pipeline",
];
const crops = [
  ["preview", 1200, 1500],
  ["hero", 1600, 900],
  ["thumb", 800, 600],
];

for (const s of services) {
  for (const [suffix, w, h] of crops) {
    for (const [fmt, opts] of fmts) {
      await sharp(`masters/service-${s}.png`)
        .resize({ width: w, height: h, fit: "cover", position: "centre" })
        .toFormat(fmt, opts)
        .toFile(`${OUT}/service-${s}-${suffix}.${fmt}`);
    }
  }
}

// Blur placeholders (24px wide, inline as data URI in components)
for (const f of frames) {
  const buf = await sharp(f.src).resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
  console.log(f.name, `data:image/webp;base64,${buf.toString("base64")}`);
}
```

Use `<picture>` with AVIF first, WebP second. Give every image width, height, and `sizes` so layout shift stays at zero. Only the hero uses `priority`.
