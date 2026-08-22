# SplitSukan

**Play together. Split fairly.**

SplitSukan is a lightweight, mobile-first Progressive Web App for managing shared expenses and repayments for casual sports sessions such as badminton, futsal, and pickleball.

The initial release is a **single-organizer, local-first MVP**. It does not require login, participant accounts, a cloud database, or real-time collaboration.

## Project Status

SplitSukan is currently in active development.

Completed foundations:

- Product Specification v0.1 approved
- GitHub repository and feature-branch workflow established
- Next.js App Router foundation created
- TypeScript, Tailwind CSS, and ESLint configured
- GitHub Actions continuous integration enabled
- Vercel preview and production deployments enabled
- Protected `main` branch configured
- Semantic design tokens added
- Light, Dark, and System themes configured
- Responsive theme and design-token preview created

Core session, participant, expense, and repayment features have not been implemented yet.

## Problem SplitSukan Solves

Casual sports sessions often involve shared costs such as:

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

SplitSukan keeps these calculations and repayment records in one place and generates a compact summary that can be shared through WhatsApp.

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

## Planned Payment Experience

The local MVP will allow an organizer to attach a payment QR to a participant who should receive money.

Planned local capabilities include:

- Attach, preview, replace, and remove a recipient payment QR
- Download the recipient QR
- Show the correct payment recipient in the financial summary
- Include clear payment instructions in the WhatsApp summary
- Keep the organizer in control of the official repayment status

After the local MVP is stable, SplitSukan may add a read-only guest payment link that allows participants to:

- Open a shared session without creating an account
- Select their participant name
- View the amount they need to pay
- Review how the amount was calculated
- View or download the correct recipient QR
- View the organizer-maintained payment status

The guest link will remain read-only. It will not provide participant editing access or automatically verify bank payments.

## Deliberately Out of Scope

The local MVP will not include:

- Login or authentication
- Google login
- Supabase or another cloud database
- Cloud synchronization
- Multi-user collaboration
- Participant accounts or participant portals
- Group membership and invitations
- Real-time RSVP
- Online payment processing
- Automatic bank reconciliation
- Direct WhatsApp API integration
- Push notifications or automatic reminders
- Receipt OCR
- Match scoring
- Polls
- Player statistics
- Club or tournament management
- Subscriptions or advertisements
- Advanced analytics and reports

These features will only be considered after the local-first MVP is stable.

## Technology Stack

- [Next.js](https://nextjs.org/) with App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- Zustand
- Lucide React
- Progressive Web App technologies
- GitHub and GitHub Actions
- Vercel
- Cloudflare DNS

> Zustand, Lucide React, and PWA-specific dependencies will be introduced in dedicated milestones when required.

## Product Specification

The approved product requirements, financial rules, data model, UI/UX direction, and MVP acceptance criteria are documented in:

[`docs/product-spec.md`](docs/product-spec.md)

The Product Specification is the source of truth for the local MVP. Product decisions should be updated there before related implementation changes are made.

## Financial Model Principles

SplitSukan follows several core financial rules:

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
git clone https://github.com/ameeridz/splitsukan.git
cd splitsukan
```

### Install Dependencies

```bash
npm ci
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

### Type Check

```bash
npm run type-check
```

Generates Next.js route-aware types and checks TypeScript without producing application output.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Combined Quality Check

```bash
npm run check
```

Runs lint, type checking, and the production build in sequence.

### Start Production Server

```bash
npm run start
```

Runs the previously generated production build.

## Current Project Structure

```text
splitsukan/
â”œâ”€â”€ .github/
â”‚   â””â”€â”€ workflows/
â”‚       â””â”€â”€ ci.yml
â”œâ”€â”€ .vscode/
â”‚   â””â”€â”€ settings.json
â”œâ”€â”€ docs/
â”‚   â””â”€â”€ product-spec.md
â”œâ”€â”€ public/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ globals.css
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â””â”€â”€ components/
â”‚       â”œâ”€â”€ providers/
â”‚       â”‚   â””â”€â”€ theme-provider.tsx
â”‚       â””â”€â”€ theme/
â”‚           â””â”€â”€ theme-selector.tsx
â”œâ”€â”€ .gitignore
â”œâ”€â”€ AGENTS.md
â”œâ”€â”€ CLAUDE.md
â”œâ”€â”€ eslint.config.mjs
â”œâ”€â”€ next.config.ts
â”œâ”€â”€ package-lock.json
â”œâ”€â”€ package.json
â”œâ”€â”€ postcss.config.mjs
â”œâ”€â”€ README.md
â””â”€â”€ tsconfig.json
```

The structure will evolve incrementally as each approved feature is implemented.

## Development Workflow

SplitSukan uses a lightweight feature-branch workflow.

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

Typical workflow:

```text
Update main
â†’ Create a focused feature branch
â†’ Implement one coherent task
â†’ Run quality checks
â†’ Review changes
â†’ Commit
â†’ Push
â†’ Open a pull request
â†’ Review CI and Vercel preview
â†’ Merge into main
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
feat: add responsive application shell
docs: update SplitSukan product documentation
fix: prevent contribution from exceeding expense
test: cover weighted split rounding
chore: configure GitHub Actions
```

## Quality Checks

Before a development task is considered complete:

```bash
npm run check
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

Current hosting:

- Vercel for preview and production deployments
- GitHub Actions for continuous integration

Planned DNS provider:

- Cloudflare

Proposed production URL:

```text
https://splitsukan.ridzu.one
```

The custom production domain will be activated in a later deployment milestone.

## Development Approach

SplitSukan is developed incrementally:

- Discuss and lock product behavior before coding
- Implement one small task or coherent change at a time
- Keep financial logic separate from UI components
- Use feature branches and pull requests
- Run lint, type checks, tests, and production build before merging
- Avoid adding login, Supabase, or multi-user functionality before the local MVP is stable

## License

No open-source license has been selected yet.

Unless a license is added, the repository remains under standard copyright protection and should not be assumed to permit reuse, modification, or redistribution.


