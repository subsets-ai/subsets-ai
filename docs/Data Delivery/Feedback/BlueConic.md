---
sidebar_position: 7
---

# BlueConic

BlueConic feedback captures when a dialogue (in-page personalization, overlay, slide-in, etc.) is shown to a user and when a user engages with it. Subsets uses these events to confirm a subscriber's exposure to a treatment in an experiment.

The recommended source is GA4. BlueConic dialogues fire GA4 events on view and click. If you do not use GA4 with BlueConic, deliver the equivalent data from BlueConic's own event stream (see [BlueConic-native events](#blueconic-native-events) below).

## GA4 dialogue events (recommended)

Deliver two event streams, one per event type. Each row represents a single dialogue impression or click.

| Stream | Fires when | Mapped event type |
| --- | --- | --- |
| Dialogue view | A BlueConic dialogue is rendered to a user | `sent` |
| Dialogue click | A user clicks an element inside a dialogue | `clicked` |

Both streams share the same schema:

| Column | Description | Example |
| --- | --- | --- |
| Event ID | Unique identifier for the event. Used for deduplication. | `evt_8f3a...` |
| Event timestamp | Timestamp of when the dialogue was shown or clicked. | `2024-01-15T09:30:00Z` |
| Event date | Date of the event. (BigQuery: Recommended partition field). | `2024-01-15` |
| BlueConic profile ID | Identifier of the BlueConic profile that saw or clicked the dialogue. Used as the join key against your subscriber identifier. | `4f02...` |
| Dialogue ID | BlueConic dialogue ID. Used as `treatment_id_external` in Subsets experiments. | `dlg_1234` |
| Dialogue name | Human-readable dialogue name. | `Renewal offer overlay` |
| Dialogue variant | Variant name (if the dialogue has multiple variants). | `Variant A` |
| Dialogue variant ID | Variant identifier. | `var_5678` |

### Identifier mapping

The BlueConic profile ID must be resolvable to the same subscriber identifier you use in your subscription and behavioral data. If you maintain a BlueConic ↔ subscriber crosswalk (for example, a join through Auth0 ID or a CDP user ID), deliver it as a separate lookup table and notify the Subsets team of the join keys.

## BlueConic-native events

If you do not capture BlueConic activity through GA4, deliver dialogue impressions and clicks directly from BlueConic following the [general feedback schema](/Data%20Delivery/Feedback/#general-schema), with:

| Subsets field | BlueConic value |
| --- | --- |
| `identifier` | BlueConic profile ID (or your resolved subscriber identifier) |
| `event_type` | `sent` for dialogue impressions, `click` for dialogue clicks |
| `event_timestamp` | Time the dialogue was shown or clicked |
| `campaign_id` | BlueConic dialogue ID |
| `campaign_name` | BlueConic dialogue name |

Include the dialogue variant name and variant ID as additional columns if you run multi-variant dialogues.
