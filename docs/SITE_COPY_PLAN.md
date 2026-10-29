# Site Copy & Lead-Gen Plan

Goal: turn capecod.world from a portfolio page into a site that brings in Cape Cod small-business leads.
Code-side fixes (meta titles, structured data, sitemap, 404s, footer, contact page) ship with the repo.
Everything below lives in **Sanity** and needs to be pasted into Studio.

## Who we are writing for

Cape Cod's year-round economy is about 229k residents, swelling to roughly 500k in summer. Visitors drive
close to half of local business revenue from April to September, and the shoulder season (Sept–Oct) now rivals
June for many businesses. The owners we want are:

- **Seasonal hospitality**: restaurants, inns, rentals, charters, tours, ice cream, mini golf. Busy 10–12 weeks,
  make decisions in the off-season (Nov–Mar). Care about: bookings, menus, hours, mobile, reviews.
- **Year-round trades and services**: landscapers, builders, plumbers, cleaners, property managers, dentists,
  salons. Care about: phone calls, quote requests, showing up on Google Maps, looking established.
- **Nonprofits and town groups**: food pantries, land trusts, churches, youth sports. Care about: donations,
  volunteer sign-ups, easy updates by non-technical staff, low cost.

What they respond to: local proof (a real Cape client), plain English, a named person, a price range or at
least "no surprise invoices," and a low-commitment first step. What turns them off: jargon, emoji-heavy
taglines, stock "digital solutions" talk, and anything that sounds like a franchise from off-Cape.

Search behavior: they search "web designer Cape Cod", "website design Hyannis", "someone to fix my website
Falmouth", and town names. Most of these searches have small volume but almost no serious competition
beyond 5 or 6 local WordPress shops.

## Homepage (Sanity → Homepage document)

| Field | Current | New |
| --- | --- | --- |
| Title | Cape Cod World | Cape Cod World |
| Subtitle | Bringing Your Ideas To The World 💡🌎 | Keep as is (brand line; the meta description carries the SEO text) |
| Heading Card 1 | What We Do | What we do |
| Heading Card 2 | To Put It Simply | Why local businesses pick us |
| Heading Card 3 | Here's How We Can Help You | Start with a free website review |

**Card 1 links** (keep URLs, rename labels):

- Web Design → `/design`
- Development → `/development`
- Content & SEO → `/digital-content`
- Hosting & Deployment → `/deployment`
- AI Integration → `/ai-integration`

**Card 1 text:**

> Fast, modern websites for restaurants, inns, trades, shops and nonprofits across Cape Cod. Pick a service
> above to see what it means for your business, in plain English.

**Card 2 text:**

> We're based on the Cape year-round, not a call center off-Cape. You get one person who knows the
> difference between Route 6A and Route 28, who answers the phone in February, and who builds sites that
> load fast on a phone at the beach. Design, development, content and hosting under one roof, with no
> surprise invoices.

**Card 3 content blocks** (text, button, text, button, text, button):

1. Text: "See what Cape Cod business owners say about working with us."
2. Button: **Read testimonials** → `/testimonials`
3. Text: "Browse recent sites we've built for local businesses and nonprofits."
4. Button: **See our work** → `/our-work`
5. Text: "Not sure where to start? Send us your current site and we'll tell you, free, what's working and
   what's costing you customers."
6. Button: **Get a free website review** → `/contact`

## Service pages (Sanity → Category documents)

All five service pages currently contain leftover draft artifacts that must be removed before anything else:
citation tags like `[picreel]`, `[diallink]`, `cheryltravis+1`; the lines "You can reference or link:" with
raw URLs; the Design page's "Keep in mind this is an eye catching display here"; and the stray editor note
at the bottom of Deployment: "Here's an updated AI section with AI voice assistants woven in…". These read
as unfinished to a prospect and as thin content to Google.

Each page also needs an **SEO description** (under 160 characters) and **keywords**. Suggested values:

### Design (`/design`)

- Title: Web Design for Cape Cod Businesses
- SEO description: Custom, mobile-first website design for Cape Cod restaurants, inns, trades and nonprofits.
  Clean layouts built around calls, bookings and directions.
- Keywords: Cape Cod web design, website design Cape Cod MA, Hyannis web designer, restaurant website Cape Cod

Body outline (rewrite, keeping the existing voice):

1. **Your website is your first "hello."** Most customers find you on a phone, often while already on the
   Cape. A clean design makes you look established and worth the drive over the bridge.
2. **Built around what customers look for first.** Hours, menu, booking, directions, phone. Not a slideshow.
3. **Already have a designer?** We'll build from their Figma, XD or Photoshop files, or refine an existing
   design. Starting from scratch? We design it with you.
4. **Looks like the Cape, not a template.** Coastal, classic, bold or modern, matched to the business.
5. **What you get:** works on phones, tablets and desktops; clear calls to action; a style that feels like
   your business.
6. Close: "Want a second opinion on your current site? Get a free review."

### Development (`/development`)

- Title: Web & App Development on Cape Cod
- SEO description: Custom web apps, booking systems, member portals and mobile apps for Cape Cod
  businesses. Modern, secure code without hiring an in-house developer.
- Keywords: web developer Cape Cod, custom website Cape Cod, online booking website, React developer
  Massachusetts

Body outline: idea on a napkin to working app; start fresh or extend what you have (booking, portals,
dashboards); built for spotty mobile connections (people looking you up from Route 6A); features you'll
actually use (reminders, scheduling, inventory). Drop the "223% ROI" paragraph and its citation.

### Digital Content (`/digital-content`)

- Title: Website Content & Local SEO for Cape Cod
- SEO description: Website copy, service pages and blog content that help Cape Cod businesses show up on
  Google and turn visitors into calls and bookings.
- Keywords: local SEO Cape Cod, website copywriting Cape Cod, Google Business Profile Cape Cod, content
  writing small business

Body outline: content that sounds like you; use what you have (brochures, menus, old copy) or done-for-you;
service pages in normal language; landing pages for weddings, rentals, home services, events; news posts
for local SEO; optional AI drafting tools inside your CMS. Add a short section: **Showing up on Google
Maps**, covering Google Business Profile setup, reviews and town-name pages, since this is the single
biggest lever for Cape trades and restaurants.

### Deployment (`/deployment`)

- Title: Website Hosting & Maintenance on Cape Cod
- SEO description: Managed hosting, backups, SSL and updates for Cape Cod business websites. Your site
  stays fast and online on a busy Saturday in July.
- Keywords: website hosting Cape Cod, website maintenance Cape Cod, managed hosting small business

Body outline: from staging to live without drama; what's covered (hosting, backups, HTTPS, monitoring,
smooth updates); your cloud, ours, or a mix; fully managed option for owners who'd rather not deal with it.
Remove the editor note at the bottom.

### AI Integration (`/ai-integration`)

- Title: Practical AI for Cape Cod Small Businesses
- SEO description: AI chat and phone assistants that answer hours, availability and booking questions
  24/7 for Cape Cod restaurants, inns, salons and service businesses.
- Keywords: AI chatbot small business, AI phone assistant, AI for restaurants, AI integration Cape Cod

Body outline: the content here is the strongest on the site; keep the structure, strip all citation tags
and "You can reference or link" blocks, and lead with Cape-specific examples: an inn answering "do you have
a room Saturday" at 11pm, a charter boat taking bookings while the captain is on the water, a landscaper's
line answering "do you do spring cleanups in Brewster" during the April rush.

## Testimonials (Sanity → Testimonial documents)

Both existing testimonials are good. Good Times Ice Cream is the local one, so add its town to the
organization field ("Good Times Ice Cream, <town>") so it reads as Cape proof. Pine Island Food Pantry is in
Florida; keep it (it shows nonprofit work and a traffic result) but label it "Pine Island Food Pantry,
Florida" so it does not read as a false local claim. The priority is one or two more Cape clients with a
result in the quote (more calls, easier updates, more bookings). Three to five testimonials is the target.

## Our Work (Sanity → Work Project documents)

Rewrite each project description to lead with the business problem and the result, not the tech stack.
Example for Pine Island Food Pantry:

> The Pantry needed a site volunteers could update without calling a developer. We built a bright,
> welcoming site with simple posts and announcements, hosted and backed up, that staff manage themselves.
> Since launch they've seen more traffic than ever.

Remove "Payload for the CMS [Content Management System]" style explanations. Add the location and business
type to each project name, for example "Pine Island Food Pantry, Florida (nonprofit)". Neither current
project is a Cape business, so the next Cape client site should go at the top of this page as soon as it
launches.

## Off-site actions that will matter more than any copy

1. **Google Business Profile** for Cape Cod World, category "Website designer", service area set to
   Barnstable County plus the Islands. Ask the two existing clients for Google reviews.
2. **Join the Cape Cod Chamber and one town chamber** (Hyannis or Falmouth). Their member directories are
   do-follow local links and where owners actually look.
3. **Submit the sitemap** in Google Search Console once this ships: `https://www.capecod.world/sitemap.xml`.
4. **Timing**: run the free-review offer hardest in November through March when owners have time to act.
