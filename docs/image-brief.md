# Meddy Oil & Gas: Remaining Image Generation Brief

**Status:** Image generation hit `429 Too Many Requests` (`QUOTA_EXHAUSTED` on `gemini-3.1-flash-image`, quota reset reported in ~4h57m). Neutral navy (`#0B1E36`–`#21538A`) placeholders with exact master aspect ratios and dimensions have been placed in `masters/` and exported to `public/images/` for the remaining 10 masters.

**Already Ready (Real Masters + Composited Logos):**
- `masters/hero-desktop.png` (`3840x2160`, `16:9`) — generated & logo-composited (`assets/logo/placements.json`)
- `masters/hero-mobile.png` (`2250x3000`, `3:4`) — generated from `hero-desktop-raw.png` & logo-composited (`assets/logo/placements.json`)
- `masters/qhse-banner.png` (`3840x1646`, `21:9`) — generated & 21:9 cropped cleanly
- `masters/service-well-construction.png` (`2400x1800`, `4:3`) — generated & border-trimmed
- `masters/about-engineer-branded.png` (`2400x3000`, `4:5`) — existing clean master, re-composited per A2 (`assets/logo/placements.json`)
- `masters/about-tank-master.png` (`2400x1800`, `4:3`) — existing clean master

---

## Shared Blocks (Paste Before & After Every Prompt)

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

## Remaining 10 Masters Needed

| # | File | Aspect | Master Size (px) | Delivered Widths / Crops | Prompt |
|---|---|---|---|---|---|
| 1 | `masters/mission-team.png` | `16:9` | `3840 x 2160` | `1920`, `1280` | Four Nigerian oil and gas engineers, two women and two men of different ages, stand around a steel table in an open air site shelter reviewing printed drawings. The drawings show only abstract lines, nothing readable. One points at a drawing, one holds a tablet, two listen. Navy coveralls, white hard hats, blank patches. Tank farm visible out of focus behind them. Soft overcast daylight with a warm orange rim light. Natural, candid, not posed. 35mm lens, 16:9. |
| 2 | `masters/qhse-banner-mobile.png` | `4:5` | `2400 x 3000` | `1080`, `720` | *(Attach `masters/qhse-banner.png` as reference)* Same two technicians and same sunset tank farm as the wide banner, framed vertically. Both subjects in the lower two thirds, upper third is orange sunset sky with little detail. Matching light and colour. 4:5. |
| 3 | `masters/careers-banner.png` | `16:9` | `3840 x 2160` | `1920`, `1280` | Three young Nigerian graduate engineers, two women and one man, in navy coveralls and white hard hats with blank patches, walk through an oilfield site beside an older Nigerian supervisor who is pointing out equipment. Candid mid stride, natural conversation, no looking at camera. Pipework and a tank behind. Warm afternoon light. Right half calm for text. 16:9. |
| 4 | `masters/service-oilfield.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | Wide documentary view of a land oilfield wellsite in coastal Nigeria at sunrise. A drilling mast stands at the centre with a wireline truck and a small crew cabin beside it. Three Nigerian crew members in navy coveralls and white hard hats with blank patches walk across the lease road in the foreground, mid conversation, not looking at the camera. Low mist, warm orange light from the left, cool blue shadows. Unmarked equipment, no lettering. Subjects and mast centred in the middle 60%, 4:3. |
| 5 | `masters/service-wireline-testing.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | A wireline intervention setup at a wellhead: a vertical lubricator stack and pressure control equipment rigged up above the wellhead, a cable running to a truck mounted unit. A Nigerian technician in navy coveralls and a white hard hat with blank patch stands at the unit's control panel in the cabin doorway, looking at the stack. Unmarked equipment, no lettering. Golden hour, 4:3, subject centred. |
| 6 | `masters/service-drilling-engineering.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | A Nigerian male drilling supervisor in his thirties, navy coverall, white hard hat with blank patch, safety glasses, stands on a land rig floor at dawn reviewing rig data on a rugged tablet whose screen shows only abstract graphs. A Nigerian woman engineer in the same uniform stands beside him pointing at the screen. Drill pipe is racked behind them and the derrick rises out of frame. Mist low on the ground, warm orange light from the left. Subjects centred in the middle 60% of the frame, medium shot, 4:3. |
| 7 | `masters/service-pressure-pumping.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | A pressure pumping spread on a land location in coastal Nigeria: several plain white pump trucks parked in a row, connected by steel high pressure lines to a wellhead. A Nigerian technician in a navy coverall, white hard hat with blank patch, safety glasses, and ear defenders stands at the control side of a truck, checking a gauge. A barrier and cones mark a safety zone. Unmarked trucks, no lettering anywhere. Bright late morning light, tropical vegetation behind. Subject and equipment centred in the middle 60%, 4:3. |
| 8 | `masters/service-integrated.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | Nigerian engineers at an operations room desk with several monitors showing abstract unreadable graphs, a large wall screen with an abstract schematic, calm focused work, navy shirts with blank chest patches, daylight from a side window. 4:3, centred. |
| 9 | `masters/service-fpso-vessel.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | An offshore support vessel alongside a floating production unit at sea in the Gulf of Guinea, a Nigerian deck crew in navy coveralls and orange life jackets on the vessel deck, golden hour. Vessel hull and unit are plain unmarked steel with no lettering. 4:3, vessel centred. |
| 10 | `masters/service-power.png` | `4:3` | `2400 x 1800` | `-preview` 1200x1500, `-hero` 1600x900, `-thumb` 800x600 | A gas fired power station in coastal Nigeria at dusk, turbine halls and exhaust stacks, a Nigerian engineer in navy coverall and white hard hat with blank patch checking a panel in the foreground, no lettering on any equipment. 4:3, centred. |

Once the 10 masters are saved into `masters/`, run `node scripts/composite-logos.mjs` (for any patches), `node scripts/export-images.mjs`, and `npm run qa:images`.
