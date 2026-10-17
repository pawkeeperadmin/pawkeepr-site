# Privacy and terms review draft — not for publication yet

Prepared for the PawKeepr 1.7 restoration, 17 October 2026. The current public HTML is unchanged in substance. This draft supplies factual replacement copy and identifies owner decisions that must be completed before publication. Do not present it as legal approval.

## Proposed privacy content

PawKeepr stores account/profile information, pet records, care history, reminders, caregiver information, household memberships and uploaded photos/documents to provide the features you choose to use. Shared household records are available according to membership and role. Storage buckets are private; temporary signed download links should be treated as private links.

Supabase provides account authentication, database, file storage and server functions. Google or Apple may provide sign-in when you select that method. Firebase provides push messaging, analytics and crash diagnostics. Google Places supports optional caregiver business search. Google Document AI processes documents submitted for extraction. Optional AI extraction/summaries use Anthropic. Resend supports transactional email, and RevenueCat coordinates supported app-store subscription entitlements. The store processes purchases; PawKeepr does not request your payment-card details in the app. The website currently loads Google Analytics; the owner must approve the intended analytics and consent behavior before hosting is restored.

AI functionality is user-controlled and defaults off for new profiles. Uploaded documents may contain personal information: review what you submit. OCR and AI suggestions must be reviewed before saving or relying on them. PawKeepr organizes records and does not provide veterinary diagnosis or emergency care.

The app provides data export and an account-deletion request flow. Deletion runs after the grace period shown in the app. A deleted member's actor identifiers on surviving household records are cleared; records owned by other members are preserved. Contact support@pawkeepr.cc if you cannot access your account or need help with an account request. Do not send passwords, sign-in codes or private keys.

## Owner decisions required before this becomes final copy

- Identify the legal operator/contact details and applicable jurisdiction.
- Approve exact retention periods for active data, deletion grace period (implementation: 30 days), exports (default: 7 days), audit metadata, diagnostics and any backups. Verify provider retention and deletion behavior; do not promise immediate deletion everywhere.
- Verify enabled analytics/crash collection, available controls and website consent implementation. Do not claim an opt-out that the interface does not provide.
- Verify international processing locations and current provider/subprocessor arrangements.
- Confirm support mailbox ownership and actual handling of privacy/deletion requests.
- Approve any exceptions for legitimate records that must be retained and how users are informed.
- Confirm the effective date, in-app legal document version/reacceptance behavior, and store privacy disclosures.

## Proposed terms updates for owner review

Describe currently implemented features and clearly exclude secure external sharing, outbound reminder email, invoice email ingestion and clinical image interpretation. State that records and reminders support organization and that users should verify dates and health information with their veterinarian. Describe household roles and the effects of leaving/deleting an account without promising recovery of erased historical data.

If paid plans are offered, use the actual store-returned price/period and approved renewal/cancellation wording, distinguish account deletion from subscription management, and confirm purchase/restore availability. Decide the global force-Pro override before making paid-feature claims. Owner/legal review must settle eligibility, acceptable use, liability, changes to service and governing terms rather than assuming the old March document remains sufficient.

Publishing must wait until the decisions above are resolved and the final HTML/version changes are reviewed. The source support/contact/security/deletion/callback pages are already prepared for technical review; mailbox, legal and store acceptance remain separate.
