---
sidebar_position: 3
---

# Feedback

Feedback events should contain events from your marketing automation/CRM/ESP system, representing communication with your subscribers via email, push notification, in-app messaging, and other channels. We use this data to verify a subscriber's exposure to a campaign.

## Platform-Specific Schemas

If you use one of the following platforms, see the platform-specific documentation:

- [Sailthru](/Data%20Delivery/Feedback/Sailthru)
- [HubSpot](/Data%20Delivery/Feedback/HubSpot)
- [Braze](/Data%20Delivery/Feedback/Braze)
- [Agillic](/Data%20Delivery/Feedback/Agillic)
- [Adobe Campaign](/Data%20Delivery/Feedback/Adobe)

## General Schema

If your platform is not listed above, deliver feedback data as a single `feedback_events` table with one row per event.

### Required Fields

| Column | Description | Example |
| --- | --- | --- |
| `identifier` | A unique identifier for the subscriber/user/customer. | `sub_001` |
| `event_type` | The type of communication event. See [event types](#event-types) below. | `sent` |
| `event_timestamp` | Timestamp of when the event occurred. | `2024-01-15T09:30:00Z` |
| `campaign_id` | Identifier for the campaign or message template. | `campaign_123` |
| `campaign_name` | Human-readable name of the campaign. | `Jan 2024 Renewal Offer` |

### Optional Fields

| Column | Description | Example |
| --- | --- | --- |
| `message_id` | Unique identifier for the individual message send. Useful for deduplication. | `msg_abc_001` |
| `subject_line` | Subject line or message title. | `Your subscription is expiring soon` |

### Event Types

The required event types depend on the channel:

| Channel | Event types |
| --- | --- |
| Email | `sent`, `delivered`, `open`, `click`, `bounce` |
| Push notification | `sent`, `open` |
| SMS | `sent`, `delivered`, `click` |
| In-app | `impression`, `click` |

## Data Synchronization

When delivering feedback data to Subsets, we recommend including:

- **Sync timestamp field**: A timestamp indicating when the data was synced/exported (e.g., `_fivetran_synced`, `synced_at`, `exported_at`). This allows Subsets to track data freshness and identify incremental updates.

- **BigQuery partitioning**: If using BigQuery, partition your tables by date (typically using the sync timestamp or event timestamp). This improves query performance and reduces costs. Please inform the Subsets team of your partitioning column name and strategy.