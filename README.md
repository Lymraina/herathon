# SkillLaunch AI

**Turn your skill into a micro-business in minutes.**

SkillLaunch AI is a React web app that helps aspiring entrepreneurs in India build personalized micro-business plans using AI. Enter your skill, budget, and location—get a complete business idea with financials, marketing tips, and actionable steps.

---

## Features

### Landing
- Hero section with app branding
- **Start for free** — navigate to login / onboarding
- **Dashboard** — quick access to saved ideas and community

### Login
- Sign-in page (Google authentication)
- Placeholder for Firebase integration (coming soon)
- Direct flow to onboarding

### Onboarding (7-Step Wizard)
1. **Skill** — e.g. Cooking, Graphic design, Tutoring
2. **Confidence** — Beginner, Intermediate, Expert
3. **Hours per week** — 1-5, 5-10, 10-20, 20+
4. **Tools** — Equipment or tools you already have
5. **Starting budget** — Under ₹1k, ₹1-5k, ₹5-20k, ₹20k+
6. **Customer type** — Online, Local, or Both
7. **City** — Your location (e.g. Mumbai, Delhi, Bangalore)

Progress bar and Back/Next navigation are included.

### AI Business Idea Generation
- Uses **Google Gemini** for personalized business plans
- Falls back to mock data if API key is missing or disabled
- Produces structured JSON with all plan sections

### Results Page

#### Hero & Stats
- Business name, tagline, description
- Stat cards: **Startup Cost**, **Profit per Sale**, **Break-even Sales**, **Time/Week**

#### Tabs
- **Overview** — Full business plan
- **Financials** — Cost and pricing details
- **Checklist** — Actionable startup steps
- **Brand Kit** — Ready-to-use marketing copy

#### Overview Tab
- **Target customers** — Segments tailored to your skill
- **Location Heat Map** — Where your business can thrive (e.g. PGs and hostels for cooking, startup hubs for design). Hot / Warm / Cool locations with reasons
- **Pricing** — Per unit, weekly, monthly
- **Materials needed** — Equipment and supplies
- **First Week Launch Plan** — Day-by-day tasks
- **Time Management Tips (for homeworkers)** — Shown when you select 5–10 or 1–5 hours/week: focus blocks, batching, boundaries, automation
- **Marketing tips** — Local or online based on customer type
- **Market insight** — Competitor landscape

#### Financials Tab
- Startup cost, profit per sale, break-even sales, weekly time commitment
- Pricing strategy (per unit, weekly, monthly)

#### Checklist Tab
- Startup checklist with checkboxes
- Progress percentage

#### Brand Kit Tab
- **Instagram bio** — Copy to clipboard
- **WhatsApp pitch** — Copy or open in WhatsApp

#### Actions
- **Start over** — Clear data and return to onboarding
- **Save Idea** — Save to dashboard
- **View Dashboard** — Go to main dashboard

### Dashboard

#### My Ideas Tab
- List of saved business ideas
- Each card: name, tagline, description, cost, time
- **+ New Idea** — Start new onboarding
- Click idea to view full results

#### Community Jobs Tab
- **Job postings** — Browse openings
- **Post a job** — Title, company, location, type (Full-time, Part-time, Contract, Freelance, Internship), salary, description, requirements, contact

#### Resources Tab
- **Mentors** — Business strategy, marketing, e-commerce, content, finance
- **Communities** — Skill-based groups (e.g. Cooking Entrepreneurs, Design Network)
- **Tools** — Templates, guides, links
- **Filters** — All, Online only, Offline only
- Mentors show availability (online/offline)

#### Forum Tab
- **Categories** — Networking, Marketplace, Discussion, Help
- **Posts** — Title, content, likes, comments
- **New post** — Title, content, category, tags
- **Comments** — Reply to posts
- **Likes** — Upvote posts

---

## Tech Stack

- **React 19** + Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Google Gemini API** for AI
- **Firebase** (planned) for auth and data
- **localStorage** for persistence (answers, idea, jobs, forum, saved ideas)

---

## Getting Started

### Install
```bash
npm install
```

### Run
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm preview
```

### Environment (Optional)
Create `.env`:
```
VITE_GEMINI_KEY=your_google_gemini_api_key
VITE_USE_MOCK=true   # Use mock data instead of API
```

---

## Project Structure

```
src/
├── App.jsx           # Routes
├── gemini.js         # AI integration (Gemini / mock)
├── mockData.js       # Fallback idea generator
├── pages/
│   ├── Landing.jsx   # Home
│   ├── Login.jsx     # Sign in
│   ├── Onboarding.jsx # 7-step wizard
│   ├── Loading.jsx   # AI generation
│   ├── Results.jsx   # Business plan & heat map
│   └── Dashboard.jsx # Ideas, Jobs, Resources, Forum
└── ...
```
