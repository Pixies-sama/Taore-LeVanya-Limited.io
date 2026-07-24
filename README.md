# Taore LeVanya Blog System

A self-contained, JSON-driven blog. No backend, no build step — just static
files you can host anywhere (Vercel, Netlify, GitHub Pages, your existing
hosting, etc.).

## File structure

```
public/
  blog/
    index.html   ← blog listing page (search, filters, cards)
    post.html    ← single article page (reads ?slug=... from the URL)
  data/
    blog-data.json   ← ALL your blog content lives here
  css/
    blog.css     ← every style for both pages
  images/
    blog/        ← put your own local images here if you don't want to
                   hotlink external photos (currently the JSON points at
                   free Pexels stock photos — see "About the images" below)
```

Drop this whole `public` folder into your project (or merge it with an
existing `public` folder). Nothing else needs to change.

---

## How to edit an existing post

Open `public/data/blog-data.json`. Each post is one object inside the
`"posts"` array:

```json
{
  "id": "post-1",
  "slug": "how-ai-is-transforming-smes-in-africa",
  "title": "How AI is Transforming SMEs in Africa",
  "category": "Technology",
  "date": "2025-05-15",
  "readTime": "5 min read",
  "excerpt": "Short 1-2 sentence summary shown on the blog card.",
  "image": "https://... or /images/blog/your-photo.jpg",
  "author": "Emeka Bello",
  "authorBio": "One or two sentences about the author.",
  "content": "<p>Full article body as HTML...</p>"
}
```

Just change the text inside the quotes and save. No coding required beyond
that — you're editing data, not code.

**Field notes:**
- `category` must be one of exactly: `Technology`, `Communication`, `Growth`,
  `Productivity`, `Branding` — these match the filter buttons and the color
  coding. Typing it differently (e.g. "tech") will still display, but it
  won't get a colored badge or match the filter button.
- `date` must stay in `YYYY-MM-DD` format — that's what powers "newest
  first" sorting and the date filter logic.
- `content` is raw HTML. You can use `<p>`, `<h2>`, `<ul><li>`, `<strong>`,
  `<em>`. Keep it on one line (or escape line breaks) since it's inside a
  JSON string — see the existing posts as a template to copy from.

## How to add a brand new post

1. Copy one of the existing post objects in `blog-data.json` as a template.
2. Give it a unique `id` (e.g. `"post-7"`) — this must not repeat.
3. Give it a unique `slug` — lowercase, hyphens instead of spaces, no
   punctuation. This becomes the URL: `post.html?slug=your-slug-here`.
4. Fill in the rest of the fields as above.
5. Add a comma after the previous post's closing `}` and paste your new
   post object in. Save the file.

That's it — no HTML/CSS changes needed. The post will automatically:
- Show up on the blog listing page, sorted correctly by date
- Be searchable and filterable by its category
- Get its own page at `post.html?slug=your-slug-here`
- Appear in the "Related Articles" section of other posts in the same
  category

## How to delete a post

Delete its entire `{ ... }` object from the array (including the comma
that separates it from the next post). Save the file.

## How to change a category's color

Open `public/css/blog.css` and edit these lines near the top:

```css
--cat-technology:#3498db;
--cat-communication:#9b59b6;
--cat-growth:#e67e22;
--cat-productivity:#1abc9c;
--cat-branding:#e74c3c;
```

## About the images

The sample data currently points at free stock photos hosted on Pexels
(pexels.com — free for commercial use, no attribution required), so the
site works out of the box with no images to upload.

To use your own photos instead:
1. Drop your image files into `public/images/blog/`.
2. In `blog-data.json`, change that post's `"image"` value to
   `"/images/blog/your-file.jpg"` (adjust the path depending on where your
   site is actually deployed from).

Recommended size: at least 1200px wide, landscape orientation (16:9 or
similar) — the layout crops to fill the space either way.

## Running it locally

Because the pages use `fetch()` to load `blog-data.json`, opening the HTML
files directly by double-clicking them (`file://...`) will fail in most
browsers due to CORS restrictions on local files. Run a tiny local server
instead, from the `public` folder:

```bash
# Python 3
python3 -m http.server 8000

# Node (if you have npx)
npx serve
```

Then visit `http://localhost:8000/blog/`.

This restriction disappears once deployed to Vercel, Netlify, or any real
static host — `fetch()` works normally there.

## Deploying

No build step needed. Point Vercel/Netlify at this folder (or wherever you
place `public/` in your existing project) and it just works. If your
hosting serves the site from a different base path, double check the
relative paths in `index.html`/`post.html` (`../css/blog.css`,
`../data/blog-data.json`) still resolve correctly.

## A note on SEO

This is a fully client-rendered blog: the page loads, then JavaScript
fetches the JSON and fills in the content. `post.html` does update the
page `<title>`, meta description, Open Graph tags, and adds Article
JSON-LD structured data — but it does this *after* the JavaScript runs.

Most modern search engines (Google) can execute JavaScript and will index
this correctly. However, some link-preview bots (older Facebook/Slack/
Twitter crawlers) don't run JavaScript and may show a generic preview
instead of the specific article's title/image when a link is shared.

If perfectly rendered social-share previews are important to you, the fix
is to pre-render each post's HTML at build time (e.g. with a static site
generator, or a prerendering service like Netlify's prerendering, or
Prerender.io). That's a bigger step than this project needs today, but
worth knowing about if link previews become a priority later.
