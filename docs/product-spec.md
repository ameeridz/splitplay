# SplitPlay Product Specification

**Version:** 0.1  
**Status:** Approved  
**Product:** SplitPlay  
**Tagline:** Play together. Split fairly.  
**Proposed URL:** https://splitplay.ridzu.one  
**Initial language:** English  
**Initial currency:** MYR

---

## 1. Product Vision

SplitPlay is a lightweight, mobile-first Progressive Web App that helps organizers of casual sports sessions record shared expenses, calculate fair participant contributions, track repayments, and prepare a payment summary for WhatsApp.

The first release is a single-organizer, local-first application. Participants do not need accounts, invitations, or their own SplitPlay installation.

SplitPlay supports real sports-session situations such as:

- Different participants sharing different expenses
- Full-session and half-session participation
- One or more participants contributing a fixed amount
- Partial or full sponsorship
- Different people paying different expenses upfront
- Full and partial repayments
- Clear identification of who owes money and who should receive money

Every financial result must be transparent and explainable.

---

## 2. Core Problem

Casual activities such as badminton, futsal, and pickleball commonly involve court rental, shuttlecocks or balls, drinks, food, equipment, and other costs. One or more participants usually pay first, and the organizer later calculates everyone's contribution.

The process becomes difficult because:

- Not every participant shares every expense
- Some participants attend only part of a session
- Some participants voluntarily contribute more
- Some expenses are sponsored
- Different expenses have different upfront payers
- Repayments may be partial
- Manual calculations can introduce rounding errors
- Payment updates are scattered across WhatsApp messages
- It is difficult to see the current amount owed and amount receivable

SplitPlay keeps a session's expenses, allocation rules, repayments, and financial summary in one place.

---

## 3. Target User

The primary user is the session organizer.

The organizer can:

- Create and manage a sports session
- Add participants
- Record expenses and upfront payers
- Choose who shares each expense
- Configure full-session and half-session participation
- Configure fixed contributions and sponsorships
- Record repayments
- Review outstanding balances
- Copy a payment summary for WhatsApp
- Mark a financially completed session as settled

Participants do not interact with the app directly in the local MVP.

---

## 4. Product Principles

### 4.1 Organizer First

Optimize the complete workflow for one organizer using one device.

### 4.2 Fast Data Entry

Common expenses should require minimal typing and few steps.

### 4.3 Transparent Calculations

The organizer must be able to understand the total, upfront payer, sharers, individual allocations, contributions, outstanding balances, and repayments.

### 4.4 Progressive Complexity

Show the basic equal-split flow first. Weighted splits, fixed contributions, sponsorships, and notes belong under advanced options.

### 4.5 Local First

The app works without registration, login, cloud database, or participant accounts. Application data is stored locally and can be exported as JSON.

### 4.6 Mobile First

Design for mobile phones first, then adapt for tablets, laptops, desktops, and installed PWA mode.

### 4.7 Financial Accuracy

Store money as integer minor units. Every valid expense and session must balance to zero.

---

## 5. Initial Constraints

- Single organizer
- Single device at a time
- No login or authentication
- No Supabase or cloud database
- No real-time collaboration
- No participant portal
- No online payment gateway
- No direct WhatsApp API integration
- MYR-first, one currency per session
- One upfront payer per expense
- `localStorage` persistence
- Versioned JSON backup and restore

---

## 6. MVP Scope

### 6.1 Session Management

The organizer can create, view, edit, duplicate, delete, settle, and reopen sessions.

Each session contains:

- Activity type: Badminton, Futsal, Pickleball, or Other
- Custom activity name when Other is selected
- Date
- Start time
- Venue
- Optional note
- Currency
- Status
- Participants
- Expenses
- Repayments

Session statuses:

- `draft`
- `active`
- `settled`

A new session starts as Draft. It may become Active after the first valid expense is created. A session can be marked Settled only after at least one expense exists and every current balance is zero.

### 6.2 Participant Management

The organizer can:

- Add, edit, and remove unused participants
- Reuse names from earlier sessions
- Add a one-time guest
- Set Full or Half as the default participation weight
- Include or exclude participants per expense
- Override a participant's weight for one expense

Weights:

- Full = 1000 weight units
- Half = 500 weight units

A participant referenced by an expense or repayment cannot be deleted unsafely.

### 6.3 Expense Management

The organizer can:

- Add, view, edit, and delete multiple expenses
- Enter title, category, amount, and optional note
- Select exactly one upfront payer
- Select ordinary sharing participants
- Use equal or weighted distribution
- Add fixed contributions
- Record full sponsorship
- Preview the allocation before saving

Initial categories:

- Court
- Equipment
- Shuttlecock
- Ball
- Drinks
- Food
- Other

Categories affect presentation only, not calculation.

### 6.4 Repayment Tracking

An upfront payment records who paid an external party. A repayment records money transferred between session participants.

A repayment contains:

- Sender
- Receiver
- Amount
- Date and time paid
- Optional note

Multiple partial repayments are supported. Payment status is derived automatically.

### 6.5 Summary and Sharing

The app shows:

- Total session expenses
- Total fixed contributions
- Total repayments
- Total outstanding
- Amount paid upfront by each participant
- Amount allocated to each participant
- Amount each participant owes or should receive
- Suggested settlements
- Payment statuses

The organizer can review and copy a compact plain-text summary for WhatsApp. SplitPlay does not send the message automatically.

### 6.6 Local App Features

- Zustand runtime state
- `localStorage` persistence
- Versioned storage schema
- JSON export and restore
- Light, Dark, and System themes
- Responsive mobile and desktop layouts
- Installable PWA
- Offline app shell

---

## 7. Out of Scope

The local MVP excludes:

- Registration, login, profiles, and password recovery
- Supabase, cloud storage, and cross-device synchronization
- Participant invitation links and live collaboration
- Roles and permissions
- Payment gateways and automatic bank reconciliation
- DuitNow payment processing or QR generation
- Direct WhatsApp, SMS, email, or push notifications
- Receipt images and OCR
- Currency conversion or multiple currencies in one session
- Percentage-based custom split and arbitrary formulas
- Recurring expense automation
- Court booking, scores, tournaments, rankings, and sports analytics
- Club or team administration
- PDF or spreadsheet reports
- Native Android or iOS applications

A proposed feature belongs in the MVP only if it is necessary to create a session, add participants, record and split expenses, identify balances, record repayments, copy a summary, or preserve the data locally.

---

## 8. Primary User Journey

```text
Open SplitPlay
→ Create Session
→ Add Participants
→ Record Expenses
→ Review Calculations
→ Copy WhatsApp Summary
→ Record Repayments
→ Settle Session
```

### 8.1 First Use

Show SplitPlay branding, tagline, a concise explanation, an empty state, a prominent Create Session action, Settings access, and theme access. Do not require onboarding, permissions, registration, or personal information.

### 8.2 Create Session

Required fields:

- Activity
- Date
- Start time
- Venue

Optional:

- Custom activity name for Other
- Note

After creation, save locally, assign Draft, open the session, and recommend Add Participants.

### 8.3 Add Participants

The organizer can add new or saved names and assign Full or Half. Adding a participant does not automatically include that participant in every expense.

### 8.4 Add Expense

The basic form asks for title, amount, upfront payer, and sharers. Before saving, show a live preview.

Example:

```text
Total expense: RM40.00
Shared by: 8 participants
Each participant: RM5.00
Juan paid upfront: RM40.00
Juan's own share: RM5.00
Juan should receive: RM35.00
```

### 8.5 Review and Settle

The Overview recommends the next useful action:

- No participants → Add Participants
- Participants but no expenses → Add Expense
- Outstanding balances → Copy Summary or Record Repayment
- All balances zero → Mark as Settled

### 8.6 Backup and Restore

Export a recognizable JSON backup. On import, validate first, show a preview, require confirmation, and replace data only after full validation.

---

## 9. Information Architecture

Top-level areas:

```text
SplitPlay
├── Sessions
└── Settings
```

Session workspace:

```text
Session
├── Overview
├── Expenses
├── Payments
└── Summary
```

Participants are managed from Overview. There are no separate Dashboard, Analytics, Profile, Clubs, Teams, Notifications, or Account pages.

---

## 10. Navigation and Routes

### 10.1 Responsive Navigation

- Mobile: bottom navigation with Sessions and Settings
- Tablet: bottom navigation or compact sidebar based on available width
- Laptop/Desktop: left sidebar
- Mobile and desktop navigation must not appear simultaneously
- New Session remains prominent without duplicating competing primary actions

### 10.2 Routes

```text
/
/sessions/new
/sessions/[sessionId]
/sessions/[sessionId]/edit
/sessions/[sessionId]/expenses
/sessions/[sessionId]/expenses/new
/sessions/[sessionId]/expenses/[expenseId]
/sessions/[sessionId]/expenses/[expenseId]/edit
/sessions/[sessionId]/payments
/sessions/[sessionId]/payments/new
/sessions/[sessionId]/summary
/settings
```

The root route is the Sessions screen. Complex forms use dedicated mobile-friendly routes. Participant management initially uses an inline panel, bottom sheet, or dialog rather than a dedicated route.

### 10.3 Screen Inventory

Required screens and states:

- Sessions: first-use empty state, draft, active, settled, loading, data-recovery states
- Create/Edit Session: validation, saving, failure, success
- Overview: no participants, no expenses, outstanding, fully settled, not found
- Participant management: empty, populated, duplicate warning, blocked deletion
- Expenses: empty, populated, delete confirmation, calculation warning
- Add/Edit Expense: equal, weighted, contribution, sponsorship, validation, preview
- Expense Details: standard, weighted, partial/full sponsorship, not found
- Payments: no expenses, no repayments, partial repayments, fully settled
- Record Repayment: manual, prefilled suggestion, partial payment, invalid input
- Summary: outstanding, partly settled, settled, copy success/failure
- Settings: theme, export, import preview, invalid backup, restore, clear data

Browser Back must behave predictably. Cancelling must not save partial records. Missing records must show a recoverable state.

---

## 11. Financial Model

The financial engine is independent from React, Next.js UI, Zustand, `localStorage`, browser APIs, and theme state.

It is responsible for:

- Expense distribution
- Equal and weighted splitting
- Fixed contributions and sponsorship
- Rounding
- Participant ledgers
- Repayments
- Payment statuses
- Suggested settlements
- Validation and invariants

### 11.1 Money Representation

All money is stored as integer sen.

```text
RM0.01 = 1
RM1.00 = 100
RM5.50 = 550
RM40.00 = 4000
```

Formatted Ringgit is presentation only.

### 11.2 Core Terms

- **Expense amount:** full amount paid to an external party
- **Upfront payer:** participant who initially paid the external party
- **Ordinary share:** amount assigned through equal or weighted distribution
- **Fixed contribution:** exact amount voluntarily assigned to one participant
- **Full sponsorship:** fixed contributions equal the full expense amount
- **Repayment:** actual transfer between participants
- **Positive balance:** should receive money
- **Negative balance:** owes money
- **Zero balance:** financially settled

### 11.3 Expense Validation

A valid expense requires:

- Title
- Amount greater than zero
- One valid upfront payer
- At least one ordinary sharer, or contributions covering the full expense
- Valid participant references
- Positive weight for every weighted sharer
- Total contributions not exceeding the expense

Invariant:

```text
Total ordinary shares + Total fixed contributions = Expense amount
```

### 11.4 Equal Split

```text
Distributable Amount = Expense Amount - Total Fixed Contributions
Exact Share = Distributable Amount / Number of Ordinary Sharers
```

Only selected sharers are affected.

### 11.5 Weighted Split

```text
Total Weight = Sum of selected weight units
Exact Share = Distributable Amount × Participant Weight / Total Weight
```

Full is 1000 and Half is 500. Existing expenses store their own weight snapshot so changing the session default does not alter history.

### 11.6 Fixed Contribution Rule

A fixed contributor is not also an ordinary sharer for the same expense. The fixed amount replaces that participant's ordinary share.

```text
Remaining Distributable Amount = Expense Amount - Total Fixed Contributions
```

If the organizer wants a participant to pay a normal share plus extra, the combined target amount is entered as that participant's fixed contribution.

### 11.7 Sponsorship

When total contributions equal the expense, the remaining distributable amount is zero.

If Juan pays RM15 upfront and Amir sponsors RM15:

```text
Juan = +RM15.00
Amir = -RM15.00
```

If Amir both pays and sponsors RM15:

```text
Amir = RM0.00
```

### 11.8 Participant Ledger

For each participant:

```text
Total Obligation
= Total Ordinary Shares + Total Fixed Contributions
```

```text
Initial Balance
= Total Upfront Paid - Total Obligation
```

```text
Current Balance
= Initial Balance + Total Repayments Sent - Total Repayments Received
```

A repayment moves both parties toward zero.

### 11.9 Repayment Validation

A repayment requires:

- Valid session sender and receiver
- Different sender and receiver
- Amount greater than zero
- Sender currently owes money
- Receiver currently should receive money
- Amount no greater than the smaller of sender debt and receiver receivable

### 11.10 Payment Status

- `pending`: participant originally owes, sent nothing, and still owes
- `partially_paid`: participant sent something and still owes
- `paid`: participant originally owed and current balance is zero
- `not_required`: participant does not need to send repayment

A receiver is never shown as Pending. Receiver progress is shown as amount received and remaining.

### 11.11 Suggested Settlements

Use a deterministic greedy matching algorithm:

1. Build creditors with positive current balances
2. Build debtors with negative current balances
3. Sort both by largest magnitude, with a stable ID/order tie-break
4. Transfer the smaller of debtor debt and creditor receivable
5. Repeat with temporary balances until all reach zero

Suggestions do not change stored state and become real only after a repayment is recorded.

### 11.12 Rounding

Use the largest remainder method:

1. Calculate exact proportional shares
2. Floor every share to integer sen
3. Calculate unallocated sen
4. Sort by fractional remainder descending
5. Allocate one sen at a time using stable participant order as tie-break

Example:

```text
RM10.00 / 3
→ RM3.34, RM3.33, RM3.33
```

The same input must always produce the same result.

### 11.13 Financial Invariants

For every valid expense:

```text
Ordinary shares + contributions = expense amount
Upfront payer credit = expense amount
Sum of participant expense balances = 0
```

For every valid session:

```text
Sum of initial balances = 0
Sum of current balances = 0
Outstanding owed = Outstanding receivable
```

All stored monetary values are finite, non-negative integers where applicable.

### 11.14 Financial Record Editing

Editing or deleting an expense recalculates all ledgers, statuses, suggestions, and summaries. Existing repayments are never silently removed. If a proposed change makes repayments unsupported, block the change and explain which records need correction.

---

## 12. Data Model

### 12.1 Root Data

```text
SplitPlayData
- schemaVersion
- sessions[]
- savedParticipants[]
- settings
- metadata
```

Initial `schemaVersion` is `1`.

### 12.2 Settings

```text
AppSettings
- theme: light | dark | system
- defaultCurrency: MYR
- hasCompletedInitialUse
```

System is the default theme.

### 12.3 Saved Participant

```text
SavedParticipant
- id
- name
- normalizedName
- createdAt
- updatedAt
- lastUsedAt
```

A saved participant is a reusable local suggestion, not an account. Names are not globally unique.

### 12.4 Session

```text
Session
- id
- activityType
- customActivityName
- date
- startTime
- venue
- note
- currency
- status
- participants[]
- expenses[]
- repayments[]
- createdAt
- updatedAt
- settledAt
```

Store date as `YYYY-MM-DD` and start time as `HH:mm` to preserve the selected local values.

### 12.5 Session Participant

```text
SessionParticipant
- id
- savedParticipantId?
- displayName
- normalizedName
- defaultWeightUnits
- participantOrder
- isActive
- createdAt
- updatedAt
```

All financial records reference `SessionParticipant.id`, not `SavedParticipant.id`. The session-level display name is a historical snapshot.

### 12.6 Expense

```text
Expense
- id
- title
- category
- amountMinor
- upfrontPayerParticipantId
- splitMethod: equal | weighted
- sharers[]
- fixedContributions[]
- note
- createdAt
- updatedAt
```

```text
ExpenseSharer
- participantId
- weightUnits
- sharerOrder
```

Fixed contribution is not a split method. Contributions are applied first; equal or weighted distribution handles the remainder.

### 12.7 Fixed Contribution

```text
FixedContribution
- id
- participantId
- amountMinor
- contributionOrder
```

Full sponsorship is represented by contribution total equal to expense amount.

### 12.8 Repayment

```text
Repayment
- id
- fromParticipantId
- toParticipantId
- amountMinor
- paidAt
- note
- createdAt
- updatedAt
```

`paidAt` is when payment occurred; `createdAt` is when it was recorded.

### 12.9 Derived Data

Do not store these as independently editable financial truth:

- Final expense shares
- Participant ledgers
- Initial and current balances
- Payment statuses
- Outstanding totals
- Settlement suggestions
- Session financial state
- WhatsApp summary text

They are derived from source records.

### 12.10 Referential Integrity

Every payer, sharer, contributor, sender, and receiver must exist in the owning session. Removing a global saved contact cannot remove historical session data. An unused session participant may be deleted; a referenced participant must be retained or deactivated.

---

## 13. Local Persistence and Backup

### 13.1 Persistence

Use one stable, versioned `localStorage` document, for example:

```text
splitplay:data
```

Persistence responsibilities:

- Safe JSON parsing
- Schema validation
- Supported migration
- Referential-integrity validation
- Financial-invariant validation
- Atomic state updates
- Safe handling of unavailable or corrupt storage

A state-changing financial action follows:

```text
Validate input
→ Apply proposed change to a draft state
→ Recalculate
→ Verify invariants
→ Commit complete valid state
→ Update metadata
→ Persist
```

On failure, preserve the last valid state.

### 13.2 Empty Data

```json
{
  "schemaVersion": 1,
  "sessions": [],
  "savedParticipants": [],
  "settings": {
    "theme": "system",
    "defaultCurrency": "MYR",
    "hasCompletedInitialUse": false
  },
  "metadata": {
    "createdAt": "RUNTIME_ISO_TIMESTAMP",
    "updatedAt": "RUNTIME_ISO_TIMESTAMP"
  }
}
```

### 13.3 Backup Envelope

```text
SplitPlayBackup
- backupFormat: splitplay-backup
- backupVersion: 1
- exportedAt
- application
- data: SplitPlayData
```

Recommended filename:

```text
splitplay-backup-YYYY-MM-DD-HHmm.json
```

### 13.4 Import

Before replacement, validate:

- JSON syntax
- Backup identifier and version
- Data schema version
- Required fields
- Session and participant structures
- References
- Integer money and weight values
- Financial invariants

Show backup date and record counts, then require confirmation. The MVP performs full replacement, not merging. Invalid imports do not modify existing data.

### 13.5 Migration

Migrations are explicit, sequential, deterministic, and tested. A future unsupported schema is rejected without guessing or overwriting the original data.

### 13.6 Privacy

Data remains in the current browser or installed PWA storage. Browser data clearing or app removal may delete it. JSON backup is readable and unencrypted. SplitPlay does not collect emails, phone numbers, addresses, IDs, banking credentials, card details, or contact-list data.

---

## 14. UI/UX Direction

### 14.1 Experience

SplitPlay should feel clean, modern, sporty, friendly, fast, and financially trustworthy—not like an accounting system, spreadsheet, bank, or generic admin dashboard.

### 14.2 Visual Direction

- Primary direction: emerald or balanced sports green
- Neutral direction: cool gray/slate
- Soft neutral page background and clear surfaces
- Subtle borders and restrained shadows
- Rounded but not excessively bubbly corners
- Lucide React icons
- No excessive gradients, glassmorphism, or decorative animation

Use semantic tokens rather than hard-coded component colors:

```text
background, foreground, surface, surface-muted,
border, input, primary, success, warning, danger,
info, muted-foreground, focus-ring
```

Color is never the only status indicator.

### 14.3 Themes

Support Light, Dark, and System. System is default.

Dark mode is a complete theme with distinct page, surface, border, input, text, selected, and focus states—not a simple inversion. Theme preference persists and follows live device changes when System is selected.

### 14.4 Typography and Money

Use one readable sans-serif family. Financial figures have clear labels and consistent formatting:

```text
RM5.00
RM40.00
RM1,250.50
```

Prefer labels such as `Owes RM5.00` and `To receive RM35.00` rather than unexplained signed values.

### 14.5 Action Hierarchy

Each screen has one dominant primary action:

- Sessions → New Session
- Create Session → Create Session
- Expenses → Add Expense
- Expense form → Save Expense
- Payments → Record Repayment
- Summary → Copy Summary

Destructive actions use clear confirmation and never receive automatic focus.

### 14.6 Forms

- Visible labels; placeholders do not replace labels
- Field-level errors near inputs
- Preserve entered values after validation failure
- Appropriate mobile keyboard
- Prevent duplicate submissions
- Group fields by purpose
- Complex forms use dedicated pages on mobile
- Sticky actions must not cover fields or conflict with bottom navigation

Amount input shows Ringgit context while converting to integer sen internally.

### 14.7 Participant Selection

Use touch-friendly selectable rows or chips, not only a standard multi-select dropdown.

```text
[✓] Juan    Full
[✓] Amir    Full
[✓] Faiz    Half
[ ] Hakim
```

Provide Select All, Clear Selection, selected count, Full/Half state, stable order, and live allocation preview.

### 14.8 Cards and Lists

Session cards show activity, date/time, venue, participant count, total expenses, outstanding amount, and status. Expense cards show title, amount, upfront payer, sharer count, split method, and contribution/sponsor indicator. Use lists rather than wide tables on mobile.

### 14.9 Empty and Feedback States

Required empty states include no sessions, participants, expenses, and repayments. Provide clear loading, success, and recovery states. Clipboard failure exposes selectable summary text for manual copy.

### 14.10 Copy Style

Initial UI language is English. Copy is concise, friendly, and non-technical.

Preferred terms:

- Session
- Participant
- Expense
- Paid upfront by
- Shared by
- Full session
- Half session
- Fixed contribution
- Full sponsor
- Repayment
- Owes
- To receive
- Outstanding
- Settled

Avoid user-facing terms such as debtor, creditor, ledger, minor unit, invariant, or allocation engine. Do not shame participants or label payments overdue because the MVP has no deadlines.

---

## 15. Responsive and Accessibility Requirements

### 15.1 Layout

- Small mobile: single column, compact header, bottom navigation, stacked fields
- Large mobile: comfortable padding, optional two-column stat cards
- Tablet: wider container and selective multi-column content
- Laptop/Desktop: left sidebar, constrained content width, two-column workspace where useful
- Large desktop: efficient horizontal use without unlimited stretching

Representative test widths:

```text
320px, 375px, 430px, 768px, 1024px, 1440px
```

No core function depends on device brand, hover, swipe, or a specific orientation. Essential content must not require page-level horizontal scrolling.

### 15.2 Installed PWA and Safe Areas

Respect notches, rounded corners, home indicators, sticky actions, and bottom navigation in browser and standalone mode, portrait and landscape.

### 15.3 Accessibility

- Semantic HTML and logical headings
- Visible labels and associated errors
- Keyboard access and logical tab order
- Visible focus in every theme
- Proper dialog focus management
- Accessible names for icon-only controls
- Status conveyed through icon, text, amount, and color
- Sufficient contrast
- Usable at 200% text/browser zoom
- Reduced-motion support
- Comfortable touch targets
- No keyboard traps

---

## 16. PWA Requirements

The MVP includes:

- Valid web app manifest
- SplitPlay app and short names
- Theme and background colors
- Required icons
- Standalone display mode
- Installability support
- Offline app shell
- Local session access and financial calculation offline
- Safe-area-aware layout

Offline does not imply cloud synchronization.

---

## 17. WhatsApp Summary

The first MVP provides one compact plain-text format.

Example:

```text
🏸 SplitPlay — Badminton
📅 20 Aug 2026, 9:00 PM
📍 ABC Badminton Centre

Expenses
• Court — RM40.00 (paid by Juan)
• Shuttlecock — RM12.00 (paid by Amir)
• Drinks — RM16.00 (paid by Faiz)

Total: RM68.00

To pay
• Amir → Juan: RM5.00
• Faiz → Juan: RM3.00
• Hakim → Amir: RM4.00

Payment status
• Amir — Pending
• Faiz — Partially Paid, RM2.00 remaining
• Hakim — Paid

Generated with SplitPlay
Play together. Split fairly.
```

The preview is visible before copying. The content contains no HTML, Markdown tables, technical IDs, or internal terminology.

---

## 18. Automated Financial Test Scenarios

Required tests include:

1. RM40 equal split among 8 → RM5 each
2. RM10 equal split among 3 → deterministic RM3.34/RM3.33/RM3.33
3. Upfront payer included in the split
4. Upfront payer excluded from the split
5. Different sharers for different expenses
6. Full/Half weighted split totaling the exact expense
7. Partial fixed contribution
8. Full sponsorship by a different upfront payer
9. Full sponsorship by the same upfront payer
10. Multiple upfront payers across expenses
11. Full repayment
12. Partial and multiple partial repayments
13. Multiple creditors and debtors
14. Invalid contribution exceeding expense
15. Invalid overpayment
16. Self-repayment
17. Expense edit after repayment
18. Expense deletion after repayment
19. Broken participant reference rejection
20. Every invariant for every valid scenario

---

## 19. Definition of Done

### 19.1 Development Task

A task is complete when:

- It is one coherent change
- It matches this specification
- Unrelated files are not modified without reason
- TypeScript, lint, relevant tests, and production build pass
- Mobile and desktop are manually checked
- Light and Dark are checked when relevant
- Accessibility is checked when relevant
- There are no unexpected console errors
- Documentation is updated if a decision changes
- The change has a clear commit and pull request
- CI and Vercel preview pass when configured

### 19.2 UI Feature

A UI feature is complete when it supports required empty, populated, error, success, theme, responsive, touch, mouse, keyboard, focus, long-content, and duplicate-submission states.

### 19.3 Financial Engine

The engine is complete when equal split, weighted split, deterministic rounding, contributions, sponsorship, ledgers, repayments, statuses, suggestions, validation, and all invariants are implemented and unit tested independently from UI and persistence.

### 19.4 Pull Request

A PR includes:

- Clear title and purpose
- Summary of changed files
- Testing steps
- Screenshots for visible UI changes, including mobile and dark mode when relevant
- Acceptance criteria and known limitations
- Passing lint, types, tests, build, CI, and preview
- No secrets or unrelated generated files
- Updated specification when decisions change

---

## 20. Git and CI/CD Workflow

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

No permanent `develop` branch is required initially.

Example branches:

```text
feature/project-foundation
feature/theme-system
feature/responsive-app-shell
feature/session-creation
feature/financial-engine
feature/repayment-tracking
fix/weighted-rounding
chore/configure-ci
```

Commit examples:

```text
docs: add SplitPlay product specification
feat: add responsive application shell
feat: implement equal split calculation
test: cover weighted split rounding
fix: prevent contribution from exceeding expense
chore: configure GitHub Actions
```

CI for pull requests and main should run:

```text
Install dependencies
→ Lint
→ Type check
→ Tests
→ Production build
```

Vercel supplies preview deployments for pull requests and production deployment from the protected production branch. Secrets are never committed.

---

## 21. MVP Release and Exit Criteria

The local MVP is stable only when this end-to-end scenario succeeds:

1. Open SplitPlay on mobile without an account
2. Create a Badminton session with date, time, and venue
3. Add eight participants
4. Add a RM40 Court expense paid by Juan and shared equally
5. Confirm RM5 each and Juan receivable RM35
6. Add another expense paid by someone else and shared by selected participants only
7. Add a Full/Half weighted expense
8. Add a partial fixed contribution
9. Add a fully sponsored expense
10. Confirm all participant balances and zero-sum invariant
11. Generate valid suggested settlements
12. Review and copy a readable WhatsApp summary
13. Record a partial repayment and confirm Partially Paid
14. Record remaining repayments and reach all zero balances
15. Mark the session Settled
16. Close and reopen the app and retain the session
17. Export, validate, and restore a JSON backup
18. Complete the flow in Light and Dark themes
19. Complete the primary flow on mobile and desktop
20. Pass lint, type checking, tests, CI, and production build
21. Install and open the PWA successfully
22. Access existing local data and calculations offline

Post-MVP work may begin only after financial tests, persistence, backup/restore, responsiveness, themes, installation, and critical defect resolution are verified.

---

## 22. Product Change Control

This document is the source of truth for the SplitPlay local MVP.

When a product decision changes:

1. Update this specification first
2. Explain the reason
3. Identify affected sections, implementation, and tests
4. Update acceptance criteria
5. Implement the change in a dedicated task
6. Avoid unrelated changes

Potential post-MVP work—login, Supabase, cloud sync, participant links, multi-organizer collaboration, reminders, live summaries, DuitNow QR, receipts, reporting, or club management—requires a new product review.

---

## Appendix A — Conceptual Data Example

```json
{
  "schemaVersion": 1,
  "sessions": [
    {
      "id": "session-example-1",
      "activityType": "badminton",
      "customActivityName": null,
      "date": "2026-08-20",
      "startTime": "21:00",
      "venue": "ABC Badminton Centre",
      "note": "Court 3",
      "currency": "MYR",
      "status": "active",
      "participants": [
        {
          "id": "session-participant-juan",
          "savedParticipantId": "saved-participant-juan",
          "displayName": "Juan",
          "normalizedName": "juan",
          "defaultWeightUnits": 1000,
          "participantOrder": 0,
          "isActive": true
        },
        {
          "id": "session-participant-amir",
          "savedParticipantId": "saved-participant-amir",
          "displayName": "Amir",
          "normalizedName": "amir",
          "defaultWeightUnits": 1000,
          "participantOrder": 1,
          "isActive": true
        }
      ],
      "expenses": [
        {
          "id": "expense-court",
          "title": "Court",
          "category": "court",
          "amountMinor": 4000,
          "upfrontPayerParticipantId": "session-participant-juan",
          "splitMethod": "equal",
          "sharers": [
            {
              "participantId": "session-participant-juan",
              "weightUnits": 1000,
              "sharerOrder": 0
            },
            {
              "participantId": "session-participant-amir",
              "weightUnits": 1000,
              "sharerOrder": 1
            }
          ],
          "fixedContributions": []
        }
      ],
      "repayments": [
        {
          "id": "repayment-amir-juan-1",
          "fromParticipantId": "session-participant-amir",
          "toParticipantId": "session-participant-juan",
          "amountMinor": 1000,
          "paidAt": "2026-08-20T12:00:00.000Z",
          "note": "Partial DuitNow payment"
        }
      ]
    }
  ],
  "savedParticipants": [],
  "settings": {
    "theme": "system",
    "defaultCurrency": "MYR",
    "hasCompletedInitialUse": true
  }
}
```

In this example, Juan pays RM40 and shares it equally with Amir, so each obligation is RM20. Initial balances are Juan +RM20 and Amir -RM20. After Amir repays RM10, current balances are Juan +RM10 and Amir -RM10; the session remains balanced at RM0.

---

## Appendix B — Product Approval

Product Specification v0.1 is approved as the baseline for repository setup and implementation planning.

The next milestone is **Project Foundation**, beginning with creation of the GitHub repository. No login, Supabase, database, or multi-user functionality should be introduced during the local MVP.
