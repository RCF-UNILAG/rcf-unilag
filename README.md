# RCF UNILAG — Official Website

The official website of the **Redeemed Christian Fellowship (RCF) UNILAG** — a campus fellowship of Christ the Redeemer's Ministry (RCCG). We carry a mandate to illuminate our world, from this campus to the world. We are the Chosen Generation.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Motion (Framer Motion)
- **Data Source:** Google Sheets (published as CSV)
- **CSV Parsing:** [PapaParse](https://www.papaparse.com/)

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/RCF-UNILAG/rcf-unilag.git
cd rcf-unilag
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example below into a new `.env` file at the root of the project:

```bash
# .env

# Public CSV export URL for the Sermons spreadsheet
NEXT_PUBLIC_SERMONS_CSV_URL=

# Public CSV export URL for the Quick Links spreadsheet
NEXT_PUBLIC_QL_CSV_URL=

# Public CSV export URL for the Tenures spreadsheet
TENURES_CSV_URL=

# Public CSV export URL for the Executives spreadsheet
EXECUTIVES_CSV_URL=

# Secret token used to trigger on-demand cache revalidation
REVALIDATION_SECRET=your-secret-here
```

See the [CSV Setup](#csv-setup) section below for how to obtain the spreadsheet URLs.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## CSV Setup

The site fetches live data from **Google Sheets** published as CSV. Data sources:

- **Sermons** — powers the `/sermons` page
- **Quick Links** — powers the `/ql` links page
- **Tenures** and **Executives** — power the `/about` and `/tenures/[slug]` pages (see [Starting a New Tenure](#starting-a-new-tenure))

### How to get the public CSV URL from Google Sheets

1. Open your Google Sheet in a browser.
2. Click **File → Share → Publish to web**.
3. In the dialog, set the first dropdown to the **specific sheet tab** you want to publish (e.g. "Sermons" or "Quick Links").
4. Set the second dropdown to **Comma-separated values (.csv)**.
5. Click **Publish** and confirm.
6. Copy the URL that appears — it will look like:
   ```
   https://docs.google.com/spreadsheets/d/e/LONG_ID/pub?gid=SHEET_ID&single=true&output=csv
   ```
7. Paste this URL as the value of the corresponding environment variable in your `.env` file.

> 📖 **Google's official guide:** [Publish a file to the web — Google Docs Help](https://support.google.com/docs/answer/37579)

> **Note:** Every time you make a change in the spreadsheet, the published CSV is updated automatically. The website caches data for **1 hour** by default and can be refreshed on demand using the [revalidation endpoint](#cache-revalidation).

---

## Spreadsheet Column Formats

### Sermons Sheet

| Column | Description | Example |
|---|---|---|
| `Timestamp` | Auto-filled submission time (can be ignored) | `4/20/2026 10:30:00` |
| `Date Preached` | The date of the sermon (`YYYY-MM-DD` format) | `2026-04-19` |
| `Sermon Title` | Title of the message | `Treasure in Earthen Vessels` |
| `Speaker` | Full name of the preacher | `Pastor Taiwo Tonade` |
| `Description` | A short summary of the message | `An encouraging message...` |
| `YouTube Link` | Full YouTube video or live stream URL | `https://www.youtube.com/live/abc123` |

> Sermons are automatically sorted by **Date Preached** (newest first).

**Example row:**
```
Timestamp,Date Preached,Sermon Title,Speaker,Description,YouTube Link
4/20/2026 10:30:00,2026-04-19,Treasure in Earthen Vessels,Pastor Taiwo Tonade,"An encouraging message about God's power working through our weaknesses.",https://www.youtube.com/live/lff2BI8Ib8o
```

---

### Quick Links Sheet

| Column | Description | Example |
|---|---|---|
| `Timestamp` | Auto-filled submission time (can be ignored) | `4/26/2026 10:00:00` |
| `Link Title` | Display label for the link | `Join our WhatsApp Community` |
| `Destination URL` | The full URL the link points to | `https://chat.whatsapp.com/...` |
| `Slug` | A short unique identifier for the link | `whatsapp` |
| `Icon (Emoji)` | An emoji displayed beside the link title | `💬` |
| `Is Active` | Whether the link is visible (`TRUE` or `FALSE`) | `TRUE` |
| `Display Order` | Sort order — higher numbers appear first | `10` |

> Only rows with `Is Active` set to `TRUE` are shown publicly.

**Example row:**
```
Timestamp,Link Title,Destination URL,Slug,Icon (Emoji),Is Active,Display Order
4/26/2026 10:00:00,Join our WhatsApp Community,https://chat.whatsapp.com/example,whatsapp,💬,TRUE,10
```

---

### Tenures Sheet

Each row represents one academic-year leadership season (a "tenure"). Powers the current-tenure section on `/about` (the newest `Year`) and every tenure's own page at `/tenures/[slug]`.

| Column | Description | Example |
|---|---|---|
| `Year` | Academic year, `YYYY/YYYY` format. Used to join with the Executives sheet and to sort tenures (newest first). | `2025/2026` |
| `Name` | Short motto/badge — the page's main heading. Also used to generate the page's URL slug. | `Phaneros Doxa` |
| `Theme` | One-sentence description of the theme, shown as a subtitle. | `The Tenure of His Manifest Glory` |
| `Description` | Short summary, used on the `/tenures` timeline and page metadata. | `A year characterized by revival and deep spiritual awakening across the campus.` |
| `Speech` | The president's speech / theme reflection. To start a new paragraph, press **Alt+Enter** (Windows) or **⌥+Enter** (Mac) inside the cell instead of just Enter — a blank line between paragraphs is what splits them into separate paragraphs on the page. | `Every time God gives a theme to a people...` |
| `PullQuote` | Optional short quote highlighted in a blockquote. Leave blank to hide it. | `One thing is clear: nobody truly encounters the Glory of God and remains ordinary.` |
| `CohortName` | The executive council's name, used for the "Meet {CohortName}" heading. | `Doxa 45` |
| `TeamDescription` | Blurb shown under the "Meet the Team" heading. Leave blank for a generic auto-generated sentence. | `Doxa 45 is the forty-fifth executive council of RCF UNILAG...` |
| `BannerUrl` | Main banner/cover image for the tenure. | `https://res.cloudinary.com/.../banner.jpg` |
| `GalleryUrls` | Optional extra carousel images. Separate multiple URLs with a pipe (`\|`). | `https://.../img1.jpg\|https://.../img2.jpg` |

> Tenures are sorted by **Year** (newest first); the top one is treated as the fellowship's current tenure everywhere on the site.

### Executives Sheet

Each row is one executive, for one tenure. A tenure with no matching rows here still gets a page — it just shows "No leadership details recorded for this tenure" instead of a picture grid.

| Column | Description | Example |
|---|---|---|
| `Year` | Must exactly match a `Year` in the Tenures sheet. | `2025/2026` |
| `Role` | The executive's office/title. A row with `Role` = `President` (case-insensitive) is used as the tenure's featured portrait and speech sign-off. | `President` |
| `Name` | Full name. | `Taiwo Tonade` |
| `PhotoUrl` | Headshot image. Leave blank to show a placeholder icon. | `https://res.cloudinary.com/.../taiwo.jpg` |

### Starting a New Tenure

When a tenure ends, no code changes or deploys are needed — just add data:

1. Add one new row to the **Tenures** sheet for the incoming `Year`, filling in at least `Year`, `Name`, and `Theme`.
2. Add one row per executive to the **Executives** sheet with that same `Year`.
3. [Revalidate](#cache-revalidation) the `leadership-archive` tag (or wait up to an hour for the cache to expire).

The new row automatically becomes "current" on `/about` (tenures are sorted newest-first by
`Year`), and the outgoing tenure automatically drops into the archive at its own
`/tenures/[slug]` page — with the same full treatment (speech, quote, photo grid) it always had.

---

## Cache Revalidation

Data from the Google Sheets CSV is cached for **1 hour** using Next.js tag-based caching. To force an immediate refresh without redeploying, call the revalidation endpoint:

### Revalidate all data

```
GET /api/revalidate?secret=YOUR_REVALIDATION_SECRET
```

### Revalidate specific data

```
GET /api/revalidate?secret=YOUR_REVALIDATION_SECRET&tags=sermons,quick-links,site-settings
```

Available tags: `sermons`, `quick-links`, `site-settings`, `leadership-archive`, `giving-projects`

> The `secret` must match the `REVALIDATION_SECRET` value in your `.env` file. Requests with an incorrect secret will receive a `401 Unauthorized` response.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── sermons/          # Sermons listing page
│   ├── ql/               # Quick Links page
│   ├── about/            # About section (current tenure)
│   ├── tenures/          # Tenure archive index + per-tenure pages
│   └── api/
│       └── revalidate/   # On-demand cache revalidation endpoint
├── components/
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── sermon-card.tsx
│   ├── quick-link-card.tsx
│   └── about/            # Tenure story/team sections, shared by /about and /tenures/[slug]
└── lib/
    ├── csv.ts            # CSV fetch & parse utility
    ├── sermons.ts        # Sermon data fetching & types
    ├── quick-links.ts    # Quick links data fetching & types
    ├── settings.ts       # Site settings data fetching
    └── archive.ts        # Tenure & executive data fetching & types
```

---

## Contributing

1. Fork the repository and create a new branch from `main`.
2. Make your changes with clear, descriptive commits.
3. Open a Pull Request with a summary of what you've changed and why.

---

> *"But you are a chosen generation, a royal priesthood, a holy nation, His own special people, that you may proclaim the praises of Him who called you out of darkness into His marvelous light."* — 1 Peter 2:9
