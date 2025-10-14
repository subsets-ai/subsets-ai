---
sidebar_position: 1
---

# Overview

The process is as follows:

1. Identify relevant tables in your data warehouse for each of the three types of data: [Subscription](Subscription/), [Behavioral](Behavioral/) and [Feedback](Feedback/). If needed, the Subsets team can assist via a brief call.
2. Share a sample of each tables.
3. The Subsets team will review the data and may request additional inclusions or exclusions.
4. Provide a complete backfill of the tables and initiate the daily sync.

General considerations:

- Do not share Personally Identifiable Information (PII) with Subsets.
- Use (if possible) timestamps with time zones for all Date/Time fields.
- A “Cancellation” refers to the timestamp when a subscriber initiates the cancellation (e.g., clicking cancel, calling support, or disabling auto-renew), not when the subscription expires.
- Clearly specify all primary keys in the shared tables.
