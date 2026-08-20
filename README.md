# SplitPlay

**Play together. Split fairly.**

SplitPlay is a lightweight, mobile-first Progressive Web App for managing shared expenses and repayments for casual sports sessions such as badminton, futsal, and pickleball.

The initial release is a **single-organizer, local-first MVP**. It does not require login, participant accounts, a cloud database, or real-time collaboration.

## Project Status

SplitPlay is currently in the **project foundation** stage.

Current progress:

- Product Specification v0.1 approved
- GitHub repository initialized
- Next.js project foundation created
- TypeScript, Tailwind CSS, and ESLint configured
- App Router and `src/` directory enabled
- Development server verified
- Lint and production build verified

Application features have not been implemented yet.

## Problem SplitPlay Solves

Casual sports sessions often involve several shared costs:

- Court rental
- Shuttlecocks or balls
- Drinks and food
- Equipment
- Other session-related expenses

One or more participants usually pay first. Dividing the cost manually becomes difficult when:

- Different expenses are shared by different participants
- Some participants join a full session while others join half
- A participant wants to contribute more
- An expense is partially or fully sponsored
- Different participants pay different expenses upfront
- Repayments are made partially
- The organizer needs to track who owes money and who should receive money

SplitPlay keeps these calculations and repayment records in one place and generates a compact summary that can be copied to WhatsApp.

## Local MVP Scope

The first MVP will support:

- Create, edit, duplicate, delete, settle, and reopen sports sessions
- Badminton, Futsal, Pickleball, and custom activities
- Participant management
- Multiple expenses per session
- One upfront payer per expense
- Per-expense participant selection
- Equal split calculations
- Full-session and half-session weighted splits
- Fixed contributions
- Partial and full sponsorship
- Amount owed and amount to receive
- Suggested settlements
- Full and partial repayment tracking
- Pending, Partially Paid, Paid, and Not Required statuses
- Session financial summary
- Copyable WhatsApp summary
- Local browser persistence
- JSON backup and restore
- Light, Dark, and System themes
- Responsive mobile, tablet, laptop, and desktop layouts
- Installable PWA support

## Deliberately Out of Scope

The local MVP will not include:

- Login or authentication
- Supabase or another cloud database
- Cloud synchronization
- Multi-user collaboration
- Participant accounts or participant portals
- Online payment processing
- Automatic bank reconciliation
- Direct WhatsApp API integration
- Push notifications or automatic reminders
- Receipt OCR
- Club, team, tournament, or score management
- Advanced analytics and reports

These features will only be considered after the local-first MVP is stable.

## Technology Stack

- [Next.js](https://nextjs.org/) with App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Zustand
- next-themes
- Lucide React
- Progressive Web App technologies
- GitHub and GitHub Actions
- Vercel
- Cloudflare DNS

> Zustand, next-themes, Lucide React, and PWA-specific dependencies will be introduced in dedicated milestones when required.

## Product Specification

The approved product requirements, financial rules, data model, UI/UX direction, and MVP acceptance criteria are documented in:

[`docs/product-spec.md`](docs/product-spec.md)

The Product Specification is the source of truth for the local MVP. Product decisions should be updated there before related implementation changes are made.

## Financial Model Principles

SplitPlay follows several core financial rules:

- Monetary values are stored as integer minor units, such as sen
- Each expense has exactly one upfront payer
- Participants are selected independently for each expense
- Positive balance means a participant should receive money
- Negative balance means a participant owes money
- Zero balance means a participant is financially settled
- Repayments remain separate from the original expenses
- Rounding must be deterministic
- Every valid expense and session must remain financially balanced

Core balance formula:

```text
Current Balance
= Initial Balance
+ Total Repayments Sent
- Total Repayments Received
```

For every valid session:

```text
Sum of all participant current balances = RM0.00
```

## Getting Started

### Prerequisites

Install:

- Node.js 20.9 or newer
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/ameeridz/splitplay.git
cd splitplay
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the local Next.js development server.

### Lint

```bash
npm run lint
```

Runs ESLint against the project.

### Production Build

```bash
npm run build
```

Creates an optimized production build and performs framework-level TypeScript validation.

### Start Production Server

```bash
npm run start
```

Runs the previously generated production build.

## Current Project Structure

```text
splitplay/
├── docs/
│   └── product-spec.md
├── public/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

The structure will evolve incrementally as each approved feature is implemented.

## Development Workflow

SplitPlay uses a lightweight feature-branch workflow.

Primary branch:

```text
main
```

Branch prefixes:

```text
feature/*
fix/*
chore/*
docs/*
test/*
```

Example:

```text
feature/project-foundation
```

Typical workflow:

```text
Update main
→ Create a focused feature branch
→ Implement one coherent task
→ Run lint and build
→ Review changes
→ Commit
→ Push
→ Open a pull request
→ Review CI and Vercel preview
→ Merge into main
```

Do not implement new features directly on `main`.

## Commit Message Style

Recommended prefixes:

```text
feat:
fix:
docs:
test:
refactor:
chore:
style:
```

Examples:

```text
feat: initialize Next.js project foundation
docs: add SplitPlay repository documentation
fix: prevent contribution from exceeding expense
test: cover weighted split rounding
chore: configure GitHub Actions
```

## Quality Checks

Before a development task is considered complete:

```bash
npm run lint
npm run build
```

Relevant automated tests will be added as the financial engine is introduced.

UI work must also be reviewed for:

- Mobile and desktop responsiveness
- Light and dark themes
- Keyboard accessibility
- Visible focus states
- Long names and large monetary values
- Empty, loading, error, and success states
- Browser console errors

## Deployment

Planned hosting:

- Vercel for application deployment
- Cloudflare for DNS

Proposed production URL:

```text
https://splitplay.ridzu.one
```

The production URL will be activated in a later deployment milestone.

## Development Approach

SplitPlay is developed incrementally:

- Discuss and lock product behavior before coding
- Implement one small task or coherent change at a time
- Keep financial logic separate from UI components
- Use feature branches and pull requests
- Run lint, tests, and production build before merging
- Avoid adding login, Supabase, or multi-user functionality before the local MVP is stable

## License

No open-source license has been selected yet.

Unless a license is added, the repository remains under standard copyright protection and should not be assumed to permit reuse, modification, or redistribution.
