# SplitSukan Product Specification

**Version:** 0.2  
**Status:** Approved  
**Product:** SplitSukan  
**Tagline:** Play together. Split fairly.  
**Proposed URL:** https://splitsukan.ridzu.one  
**Initial language:** English  
**Initial currency:** MYR  
**Last updated:** 22 August 2026

---

## 1. Product Vision

SplitSukan is a lightweight, mobile-first Progressive Web App that helps organizers of casual sports sessions record shared expenses, calculate fair participant contributions, track repayments, and prepare transparent payment summaries.

The first release is a single-organizer, local-first application. Participants do not need accounts, invitations, or their own SplitSukan installation.

SplitSukan supports real sports-session situations such as:

- Different participants sharing different expenses
- Full-session and half-session participation
- One or more participants contributing a fixed amount
- Partial or full sponsorship
- Different people paying different expenses upfront
- Full and partial repayments
- Clear identification of who owes money and who should receive money
- Recipient payment QR attachment
- Transparent payment instructions suitable for WhatsApp

Every financial result must be accurate, deterministic, transparent, and explainable.

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
- Participants may not understand how their amount was calculated
- Participants need a convenient way to obtain the correct recipient QR
- It is difficult to see the current amount owed and amount receivable

SplitSukan keeps a session's expenses, allocation rules, repayments, payment instructions, and financial summary in one place.

---

## 3. Product Positioning

SplitSukan is an organizer-first sports expense tool with a no-login local workflow.

The core promise is:

> Record the costs, split them fairly, track repayments, and share a transparent payment summary.

SplitSukan is not intended to become a general sports-management platform during the local MVP.

The product deliberately avoids requiring:

- Google login
- Participant accounts
- Group membership
- Real-time RSVP
- Match scoring
- Player statistics
- Subscriptions
- Advertisements

---

## 4. Target Users

### 4.1 Organizer

The organizer is the primary user in the local MVP.

The organizer can:

- Create and manage a sports session
- Add participants
- Record expenses and upfront payers
- Choose who shares each expense
- Configure full-session and half-session participation
- Configure fixed contributions and sponsorships
- Attach a payment QR to a participant who should receive money
- Record repayments
- Review outstanding balances
- Copy a payment summary for WhatsApp
- Mark a financially completed session as settled

### 4.2 Participant or Guest

Participants do not interact directly with the local MVP.

After the local MVP is stable, a read-only guest payment link may allow participants to:

- Open a shared session without login
- Select a participant name
- View the amount assigned to that participant
- Review how the amount was calculated
- View or download the correct recipient QR
- View the organizer-maintained payment status

A guest link is a shared group-information page, not an authenticated private portal.

---

## 5. Product Principles

### 5.1 Organizer First

Optimize the complete workflow for one organizer using one device.

### 5.2 Fast Data Entry

Common expenses should require minimal typing and few steps.

### 5.3 Transparent Calculations

The organizer must be able to understand the total, upfront payer, sharers, individual allocations, contributions, outstanding balances, and repayments.

### 5.4 Progressive Complexity

Show the basic equal-split flow first. Weighted splits, fixed contributions, sponsorships, and optional notes belong under advanced options.

### 5.5 Local First

The local MVP works without registration, login, cloud database, or participant accounts. Application data is stored locally and can be exported as JSON.

### 5.6 Mobile First

Design for mobile phones first, then adapt for tablets, laptops, desktops, and installed PWA mode.

### 5.7 Financial Accuracy

Store money as integer minor units. Every valid expense and session must balance to zero.

### 5.8 Privacy by Minimization

Store only the information required for session calculations and payment instructions. Do not require participant phone numbers, emails, addresses, identity numbers, or banking credentials.

---

## 6. Initial Product Constraints

- Single organizer
- Single device at a time
- No login or authentication
- No Google login
- No Supabase or cloud database
- No real-time collaboration
- No participant portal in the local MVP
- No online payment gateway
- No direct WhatsApp API integration
- MYR-first, one currency per session
- One upfront payer per expense
- `localStorage` persistence
- Versioned JSON backup and restore
- Organizer controls the official repayment status

---

## 7. Local MVP Scope

### 7.1 Session Management

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
- Payment profiles or recipient QR references

Session statuses:

- `draft`
- `active`
- `settled`

A new session starts as Draft. It may become Active after the first valid expense is created. A session can be marked Settled only after at least one expense exists and every current balance is zero.

### 7.2 Participant Management

The organizer can:

- Add, edit, and remove unused participants
- Reuse names from earlier sessions
- Add a one-time guest
- Set Full or Half as the default participation weight
- Include or exclude participants per expense
- Override a participant's weight for one expense
- Attach a payment QR when the participant may receive money

Weights:

- Full = 1000 weight units
- Half = 500 weight units

A participant referenced by an expense, contribution, repayment, or payment profile cannot be deleted unsafely.

### 7.3 Expense Management

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

### 7.4 Repayment Tracking

An upfront payment records who paid an external party. A repayment records money transferred between session participants.

A repayment contains:

- Sender
- Receiver
- Amount
- Date and time paid
- Optional note

Multiple partial repayments are supported. Payment status is derived automatically.

### 7.5 Recipient Payment QR

The local MVP may allow the organizer to attach a payment QR to a participant who should receive money.

The organizer can:

- Upload a QR image
- Preview the QR
- Replace the QR
- Remove the QR
- Download the QR
- Add an optional payment instruction
- Show the QR recipient beside the QR

The application must not claim that an uploaded QR has been verified.

Payment guidance should remind participants to confirm that the recipient name displayed by the banking application matches the intended SplitSukan recipient.

A QR is associated with a receiving participant rather than the entire session because one session may have multiple receivers.

### 7.6 Summary and Sharing

The app shows:

- Total session expenses
- Total fixed contributions
- Total repayments
- Total outstanding
- Amount paid upfront by each participant
- Amount allocated to each participant
- Amount each participant owes or should receive
- Suggested settlements
- Payment recipients
- Available recipient QR indicators
- Payment statuses

The organizer can review and copy a compact plain-text summary for WhatsApp. SplitSukan does not send the message automatically.

### 7.7 Local App Features

- Zustand runtime state
- `localStorage` persistence
- Versioned storage schema
- JSON export and restore
- Light, Dark, and System themes
- Responsive mobile, tablet, laptop, and desktop layouts
- Installable PWA
- Offline app shell

---

## 8. Deliberately Out of Scope for Local MVP

The local MVP excludes:

- Registration, login, profiles, and password recovery
- Google login
- Supabase, cloud storage, and cross-device synchronization
- Participant invitation links and live collaboration
- Roles and permissions
- Group membership
- Live RSVP
- Payment gateways and automatic bank reconciliation
- Automatic QR validation
- DuitNow payment processing
- Direct WhatsApp, SMS, email, or push notifications
- Receipt images and OCR
- Currency conversion or multiple currencies in one session
- Percentage-based custom split and arbitrary formulas
- Recurring expense automation
- Court booking
- Match scoring
- Tournaments and rankings
- Player statistics
- Polls
- Club or team administration
- Subscriptions
- Advertisements
- PDF or spreadsheet reports
- Native Android or iOS applications

A proposed feature belongs in the local MVP only if it is necessary to create a session, add participants, record and split expenses, identify balances, record repayments, provide payment instructions, copy a summary, or preserve the data locally.

---

## 9. Post-MVP Guest Payment Link

After the local MVP is stable, SplitSukan may support a no-login, read-only guest payment link.

### 9.1 Organizer Flow

```text
Complete session calculation
→ Attach recipient QR
→ Review guest summary
→ Publish a selected read-only snapshot
→ Receive a random share link
→ Copy the link to WhatsApp
```

### 9.2 Guest Flow

```text
Open shared link
→ Select participant name
→ View assigned amount
→ Review calculation breakdown
→ View payment recipient
→ View or download recipient QR
```

### 9.3 Guest Page Content

The guest page may show:

- Activity
- Date, time, and venue
- Selected participant amount
- Expense breakdown affecting the selected participant
- Settlement instructions
- Recipient names
- Recipient QR images
- Organizer-maintained payment status
- Published timestamp
- Last-updated timestamp

### 9.4 Guest Link Restrictions

The guest page must be:

- Read-only
- Accessible without login
- Protected by a random, difficult-to-guess token
- Revocable by the organizer
- Optionally expiring
- Limited to a selected published snapshot

The guest page must not expose:

- Organizer settings
- Other sessions
- Saved participant address book
- Internal notes not selected for publishing
- Edit actions
- Banking credentials
- Technical identifiers
- Local JSON backup data

### 9.5 Identity Limitation

Selecting a participant name does not authenticate identity.

Anyone with the shared link may be able to select another participant's name. Therefore, the guest page must be treated as shared group information and must not contain sensitive personal information.

### 9.6 Payment Status Authority

The organizer remains the source of truth for official payment status.

The guest page must not allow a participant to directly set a repayment to Paid.

A future optional action such as `I've sent the payment` may create a non-final state such as `Payment reported`, but the organizer must verify the payment before the official status changes to Paid.

---

## 10. Primary User Journey

```text
Open SplitSukan
→ Create Session
→ Add Participants
→ Record Expenses
→ Review Calculations
→ Add Recipient QR where needed
→ Copy WhatsApp Summary
→ Record Repayments
→ Settle Session
```

### 10.1 First Use

Show SplitSukan branding, tagline, a concise explanation, an empty state, a prominent Create Session action, Settings access, and theme access. Do not require onboarding, permissions, registration, or personal information.

### 10.2 Create Session

Required fields:

- Activity
- Date
- Start time
- Venue

Optional:

- Custom activity name for Other
- Note

After creation, save locally, assign Draft, open the session, and recommend Add Participants.

### 10.3 Add Participants

The organizer can add new or saved names and assign Full or Half. Adding a participant does not automatically include that participant in every expense.

### 10.4 Add Expense

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

### 10.5 Review and Settle

The Overview recommends the next useful action:

- No participants → Add Participants
- Participants but no expenses → Add Expense
- Receiver without QR → Add Payment QR
- Outstanding balances → Copy Summary or Record Repayment
- All balances zero → Mark as Settled

### 10.6 Backup and Restore

Export a recognizable JSON backup. On import, validate first, show a preview, require confirmation, and replace data only after full validation.

---

## 11. Information Architecture

Top-level areas:

```text
SplitSukan
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

## 12. Navigation and Responsive App Shell

### 12.1 Mobile and Tablet Navigation

SplitSukan will use a floating liquid-glass bottom navigation on compact layouts.

Primary destinations:

```text
Sessions
Create Session
Settings
```

The center Create Session action may be represented by a prominent plus button with the accessible name `Create new session`.

The navigation should use:

- A semi-transparent semantic surface
- Backdrop blur where supported
- Sufficient opacity for readability
- A subtle border
- A restrained shadow
- Rounded floating-dock geometry
- Safe-area-aware bottom spacing
- A solid-surface fallback when backdrop blur is unsupported

Liquid-glass styling is limited primarily to the navigation shell. Financial and content cards use solid semantic surfaces.

### 12.2 Desktop Navigation

Laptop and desktop layouts use a left sidebar with:

- SplitSukan branding
- Sessions
- New Session
- Settings

The mobile bottom navigation and desktop sidebar must not appear simultaneously.

### 12.3 Theme Access

The application header will use a compact appearance button. Activating it opens Light, Dark, and System choices.

The Settings page will provide the full appearance selector.

The segmented selector on the design-preview page is a foundation QA control, not the final application-header control.

### 12.4 Routes

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

---

## 13. Financial Model

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

### 13.1 Money Representation

All money is stored as integer sen.

```text
RM0.01 = 1
RM1.00 = 100
RM5.50 = 550
RM40.00 = 4000
```

Formatted Ringgit is presentation only.

### 13.2 Core Terms

- **Expense amount:** full amount paid to an external party
- **Upfront payer:** participant who initially paid the external party
- **Ordinary share:** amount assigned through equal or weighted distribution
- **Fixed contribution:** exact amount voluntarily assigned to one participant
- **Full sponsorship:** fixed contributions equal the full expense amount
- **Repayment:** actual transfer between participants
- **Positive balance:** should receive money
- **Negative balance:** owes money
- **Zero balance:** financially settled

### 13.3 Expense Validation

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

### 13.4 Equal Split

```text
Distributable Amount = Expense Amount - Total Fixed Contributions
Exact Share = Distributable Amount / Number of Ordinary Sharers
```

Only selected sharers are affected.

### 13.5 Weighted Split

```text
Total Weight = Sum of selected weight units
Exact Share = Distributable Amount × Participant Weight / Total Weight
```

Full is 1000 and Half is 500. Existing expenses store their own weight snapshot so changing the session default does not alter history.

### 13.6 Fixed Contribution Rule

A fixed contributor is not also an ordinary sharer for the same expense. The fixed amount replaces that participant's ordinary share.

```text
Remaining Distributable Amount = Expense Amount - Total Fixed Contributions
```

If the organizer wants a participant to pay a normal share plus extra, the combined target amount is entered as that participant's fixed contribution.

### 13.7 Sponsorship

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

### 13.8 Participant Ledger

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

### 13.9 Repayment Validation

A repayment requires:

- Valid session sender and receiver
- Different sender and receiver
- Amount greater than zero
- Sender currently owes money
- Receiver currently should receive money
- Amount no greater than the smaller of sender debt and receiver receivable

### 13.10 Payment Status

- `pending`: participant originally owes, sent nothing, and still owes
- `partially_paid`: participant sent something and still owes
- `paid`: participant originally owed and current balance is zero
- `not_required`: participant does not need to send repayment

A receiver is never shown as Pending. Receiver progress is shown as amount received and remaining.

### 13.11 Suggested Settlements

Use a deterministic greedy matching algorithm:

1. Build creditors with positive current balances
2. Build debtors with negative current balances
3. Sort both by largest magnitude, with a stable ID or order tie-break
4. Transfer the smaller of debtor debt and creditor receivable
5. Repeat with temporary balances until all reach zero

Suggestions do not change stored state and become real only after a repayment is recorded.

### 13.12 Rounding

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

### 13.13 Financial Invariants

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

All stored monetary values are finite integers where applicable.

### 13.14 Financial Record Editing

Editing or deleting an expense recalculates all ledgers, statuses, suggestions, and summaries. Existing repayments are never silently removed. If a proposed change makes repayments unsupported, block the change and explain which records need correction.

---

## 14. Data Model

### 14.1 Root Data

```text
SplitSukanData
- schemaVersion
- sessions[]
- savedParticipants[]
- paymentProfiles[]
- settings
- metadata
```

Initial `schemaVersion` is `1`.

### 14.2 Settings

```text
AppSettings
- theme: light | dark | system
- defaultCurrency: MYR
- hasCompletedInitialUse
```

System is the default theme.

### 14.3 Saved Participant

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

### 14.4 Payment Profile

```text
PaymentProfile
- id
- savedParticipantId?
- displayName
- qrImageData?
- paymentNote?
- createdAt
- updatedAt
```

A payment profile stores optional local payment instructions for a potential receiver.

The image representation must be selected carefully during implementation because large base64 images can consume significant `localStorage` capacity. Image-size limits, compression, or local browser object storage may be required.

The MVP must never store banking credentials.

### 14.5 Session

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

### 14.6 Session Participant

```text
SessionParticipant
- id
- savedParticipantId?
- displayName
- normalizedName
- defaultWeightUnits
- participantOrder
- isActive
- paymentProfileId?
- createdAt
- updatedAt
```

All financial records reference `SessionParticipant.id`, not `SavedParticipant.id`. The session-level display name is a historical snapshot.

### 14.7 Expense

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

### 14.8 Fixed Contribution

```text
FixedContribution
- id
- participantId
- amountMinor
- contributionOrder
```

Full sponsorship is represented by contribution total equal to expense amount.

### 14.9 Repayment

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

### 14.10 Derived Data

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

### 14.11 Referential Integrity

Every payer, sharer, contributor, sender, and receiver must exist in the owning session. Removing a global saved contact cannot remove historical session data. An unused session participant may be deleted; a referenced participant must be retained or deactivated.

---

## 15. Local Persistence and Backup

### 15.1 Persistence

Use one stable, versioned local data document.

Proposed storage key:

```text
splitsukan:data
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

### 15.2 Empty Data

```json
{
  "schemaVersion": 1,
  "sessions": [],
  "savedParticipants": [],
  "paymentProfiles": [],
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

### 15.3 Backup Envelope

```text
SplitSukanBackup
- backupFormat: splitsukan-backup
- backupVersion: 1
- exportedAt
- application
- data: SplitSukanData
```

Recommended filename:

```text
splitsukan-backup-YYYY-MM-DD-HHmm.json
```

### 15.4 Import

Before replacement, validate:

- JSON syntax
- Backup identifier and version
- Data schema version
- Required fields
- Session and participant structures
- Payment profile structures
- References
- Integer money and weight values
- Financial invariants

Show backup date and record counts, then require confirmation. The MVP performs full replacement, not merging. Invalid imports do not modify existing data.

### 15.5 Migration

Migrations are explicit, sequential, deterministic, and tested. A future unsupported schema is rejected without guessing or overwriting the original data.

### 15.6 Privacy

Data remains in the current browser or installed PWA storage. Browser-data clearing or app removal may delete it. JSON backup is readable and unencrypted. SplitSukan does not collect emails, phone numbers, addresses, identity numbers, banking credentials, card details, or contact-list data.

---

## 16. UI and UX Direction

### 16.1 Experience

SplitSukan should feel clean, modern, sporty, friendly, fast, and financially trustworthy—not like an accounting system, spreadsheet, bank, or generic admin dashboard.

### 16.2 Visual Direction

- Primary direction: emerald or balanced sports green
- Neutral direction: cool gray or slate
- Soft neutral page background and clear surfaces
- Subtle borders and restrained shadows
- Rounded but not excessively bubbly corners
- Lucide React icons
- Liquid-glass treatment reserved mainly for app navigation
- No excessive gradients or decorative animation

Use semantic tokens rather than hard-coded component colors:

```text
background, foreground, surface, surface-muted,
border, input, primary, success, warning, danger,
info, muted-foreground, focus-ring
```

Color is never the only status indicator.

### 16.3 Themes

Support Light, Dark, and System. System is default.

Dark mode is a complete theme with distinct page, surface, border, input, text, selection, status, and focus states—not a simple inversion. Theme preference persists and follows live device changes when System is selected.

### 16.4 Typography and Money

Use one readable sans-serif family. Financial figures have clear labels and consistent formatting:

```text
RM5.00
RM40.00
RM1,250.50
```

Prefer labels such as `Owes RM5.00` and `To receive RM35.00` rather than unexplained signed values.

### 16.5 Action Hierarchy

Each screen has one dominant primary action:

- Sessions → New Session
- Create Session → Create Session
- Expenses → Add Expense
- Expense form → Save Expense
- Payments → Record Repayment
- Summary → Copy Summary

Destructive actions use clear confirmation and never receive automatic focus.

### 16.6 Forms

- Visible labels; placeholders do not replace labels
- Field-level errors near inputs
- Preserve entered values after validation failure
- Appropriate mobile keyboard
- Prevent duplicate submissions
- Group fields by purpose
- Complex forms use dedicated pages on mobile
- Sticky actions must not cover fields or conflict with bottom navigation

Amount input shows Ringgit context while converting to integer sen internally.

### 16.7 Participant Selection

Use touch-friendly selectable rows or chips, not only a standard multi-select dropdown.

```text
[✓] Juan    Full
[✓] Amir    Full
[✓] Faiz    Half
[ ] Hakim
```

Provide Select All, Clear Selection, selected count, Full or Half state, stable order, and live allocation preview.

### 16.8 Cards and Lists

Session cards show activity, date or time, venue, participant count, total expenses, outstanding amount, and status. Expense cards show title, amount, upfront payer, sharer count, split method, and contribution or sponsor indicator. Use lists rather than wide tables on mobile.

### 16.9 Empty and Feedback States

Required empty states include no sessions, participants, expenses, and repayments. Provide clear loading, success, and recovery states. Clipboard failure exposes selectable summary text for manual copy.

### 16.10 Copy Style

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

## 17. Responsive and Accessibility Requirements

### 17.1 Layout

- Small mobile: single column, compact header, floating bottom navigation, stacked fields
- Large mobile: comfortable padding, optional two-column stat cards
- Tablet: wider container and selective multi-column content
- Laptop or desktop: left sidebar, constrained content width, two-column workspace where useful
- Large desktop: efficient horizontal use without unlimited stretching

Representative test widths:

```text
320px, 375px, 430px, 768px, 1024px, 1440px
```

No core function depends on device brand, hover, swipe, or a specific orientation. Essential content must not require page-level horizontal scrolling.

### 17.2 Installed PWA and Safe Areas

Respect notches, rounded corners, home indicators, sticky actions, and bottom navigation in browser and standalone mode, portrait and landscape.

### 17.3 Accessibility

- Semantic HTML and logical headings
- Visible labels and associated errors
- Keyboard access and logical tab order
- Visible focus in every theme
- Proper dialog focus management
- Accessible names for icon-only controls
- Status conveyed through icon, text, amount, and color
- Sufficient contrast
- Usable at 200 percent text or browser zoom
- Reduced-motion support
- Comfortable touch targets
- No keyboard traps

---

## 18. PWA Requirements

The MVP includes:

- Valid web app manifest
- SplitSukan app and short names
- Theme and background colors
- Required icons
- Standalone display mode
- Installability support
- Offline app shell
- Local session access and financial calculation offline
- Safe-area-aware layout

Offline does not imply cloud synchronization.

---

## 19. WhatsApp Summary

The first MVP provides one compact plain-text format.

Example:

```text
🏸 SplitSukan — Badminton
📅 22 Aug 2026, 9:00 PM
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

Payment QR available for Juan and Amir.

Generated with SplitSukan
Play together. Split fairly.
```

The preview is visible before copying. The content contains no HTML, Markdown tables, technical IDs, or internal terminology.

---

## 20. Automated Financial Test Scenarios

Required tests include:

1. RM40 equal split among 8 → RM5 each
2. RM10 equal split among 3 → deterministic RM3.34, RM3.33, RM3.33
3. Upfront payer included in the split
4. Upfront payer excluded from the split
5. Different sharers for different expenses
6. Full or Half weighted split totaling the exact expense
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
21. Receiver QR association does not alter financial balances
22. Removing a QR does not alter financial balances

---

## 21. Definition of Done

### 21.1 Development Task

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

### 21.2 UI Feature

A UI feature is complete when it supports required empty, populated, error, success, theme, responsive, touch, mouse, keyboard, focus, long-content, and duplicate-submission states.

### 21.3 Financial Engine

The engine is complete when equal split, weighted split, deterministic rounding, contributions, sponsorship, ledgers, repayments, statuses, suggestions, validation, and all invariants are implemented and unit tested independently from UI and persistence.

### 21.4 Pull Request

A pull request includes:

- Clear title and purpose
- Summary of changed files
- Testing steps
- Screenshots for visible UI changes, including mobile and Dark mode when relevant
- Acceptance criteria and known limitations
- Passing lint, types, tests, build, CI, and preview
- No secrets or unrelated generated files
- Updated specification when decisions change

---

## 22. Git and CI/CD Workflow

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

CI for pull requests and `main` runs:

```text
Install dependencies
→ Lint
→ Type check
→ Tests when available
→ Production build
```

Vercel supplies preview deployments for pull requests and production deployment from `main`. Secrets are never committed.

---

## 23. MVP Release and Exit Criteria

The local MVP is stable only when this end-to-end scenario succeeds:

1. Open SplitSukan on mobile without an account
2. Create a Badminton session with date, time, and venue
3. Add eight participants
4. Add a RM40 Court expense paid by Juan and shared equally
5. Confirm RM5 each and Juan receivable RM35
6. Add another expense paid by someone else and shared by selected participants only
7. Add a Full or Half weighted expense
8. Add a partial fixed contribution
9. Add a fully sponsored expense
10. Confirm all participant balances and zero-sum invariant
11. Generate valid suggested settlements
12. Attach a payment QR to a receiver
13. Review and copy a readable WhatsApp summary
14. Download or view the correct recipient QR
15. Record a partial repayment and confirm Partially Paid
16. Record remaining repayments and reach all zero balances
17. Mark the session Settled
18. Close and reopen the app and retain the session
19. Export, validate, and restore a JSON backup
20. Complete the flow in Light and Dark themes
21. Complete the primary flow on mobile and desktop
22. Pass lint, type checking, tests, CI, and production build
23. Install and open the PWA successfully
24. Access existing local data and calculations offline

Post-MVP work may begin only after financial tests, persistence, backup or restore, responsiveness, themes, installation, and critical-defect resolution are verified.

---

## 24. Product Change Control

This document is the source of truth for the SplitSukan local MVP.

When a product decision changes:

1. Update this specification first
2. Explain the reason
3. Identify affected sections, implementation, and tests
4. Update acceptance criteria
5. Implement the change in a dedicated task
6. Avoid unrelated changes

Potential post-MVP work—hosted guest snapshots, participant reporting, cloud sync, reminders, receipt handling, or club management—requires a new product review.

---

## 25. Naming and Technical Identifiers

Official product capitalization:

```text
SplitSukan
```

Technical identifiers:

```text
Package name: splitsukan
Target repository name: splitsukan
Proposed storage key: splitsukan:data
Backup format: splitsukan-backup
Proposed domain: splitsukan.ridzu.one
```

Avoid new references to the previous working name in product-facing content.

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
      "date": "2026-08-22",
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
          "isActive": true,
          "paymentProfileId": "payment-profile-juan"
        },
        {
          "id": "session-participant-amir",
          "savedParticipantId": "saved-participant-amir",
          "displayName": "Amir",
          "normalizedName": "amir",
          "defaultWeightUnits": 1000,
          "participantOrder": 1,
          "isActive": true,
          "paymentProfileId": null
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
      "repayments": []
    }
  ],
  "savedParticipants": [],
  "paymentProfiles": [
    {
      "id": "payment-profile-juan",
      "savedParticipantId": "saved-participant-juan",
      "displayName": "Juan",
      "qrImageData": "LOCAL_IMAGE_REFERENCE",
      "paymentNote": "Verify the recipient name before paying."
    }
  ],
  "settings": {
    "theme": "system",
    "defaultCurrency": "MYR",
    "hasCompletedInitialUse": true
  }
}
```

In this example, Juan pays RM40 and shares it equally with Amir, so each obligation is RM20. Initial balances are Juan +RM20 and Amir -RM20. Juan's payment profile supplies optional local payment instructions and does not change either balance.

---

## Appendix B — Product Approval

Product Specification v0.2 is approved as the baseline for SplitSukan local MVP implementation.

The approved direction is:

- Organizer-first
- No login
- Local-first
- Transparent calculations
- Recipient payment QR in the local MVP
- Read-only no-login guest payment link only after the local MVP is stable
- Floating liquid-glass mobile navigation with a solid, accessible fallback

No Google login, Supabase, database, or multi-user editing should be introduced during the local MVP.
