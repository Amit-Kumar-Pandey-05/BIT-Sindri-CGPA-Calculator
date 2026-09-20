# BIT Sindri CGPA Calculator

A simple, responsive, single-page CGPA calculator inspired by the supplied BIT Sindri reference interface.

## Files

- `index.html` — landing page + calculator UI
- `style.css` — responsive dark/glass UI
- `script.js` — CGPA calculation and branch switching
- `data.js` — branch data

## CGPA formula

CGPA = Σ(SGPA × Semester Credits) / Σ(Semester Credits)

Only semesters with an entered SGPA and available credit data are included.

## Important

The screenshots supplied contain branch-wise credits for Semesters III and IV, plus some example values for other semesters. The project therefore does **not invent missing official credit values**.

Once the official Excel sheet is supplied, the `data.js`/`script.js` data section can be updated to contain the complete Semester I–VIII credits for every branch.

No backend is required. All calculations happen in the browser.
