# Website restoration review — not deployed

Branch codex/restore-pawkeepr-1x starts from 99b0501f89f824a6b51dd6c95e08df2266a7ec27. Replaces support/contact/security redirects with real guidance, adds account deletion instructions and an auth callback fallback without analytics. Callback forwards only to the fixed native scheme and removes sensitive query/fragment from browser history; device acceptance remains required.

Privacy/terms are preserved pending owner review: provider disclosures, retention, analytics controls, legal identity and current payment behavior must be reconciled before launch. Verify support@pawkeepr.cc mailbox access and response ownership. Static guidance does not prove account deletion, email delivery or billing works.

GitHub Pages is currently disabled. Existing deploy_pages.yml expects Pages source GitHub Actions. After reviewing this source, explicitly approve Pages enablement/source selection and deployment. Preserve Cloudflare DNS, TLS and mail records. No publication or account setting was changed in this preparation.
