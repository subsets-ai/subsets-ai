---
sidebar_position: 1
sidebar_label: Google Analytics 4
---

# Google Analytics 4 (GA4)

Google Analytics 4 behavioral data tracks your subscribers' interactions with your digital products. Subsets uses this data to understand content engagement patterns and subscription behavior.

## Data Format

GA4 data can be delivered in two formats - we accept either:

1. **Raw nested format** - Native BigQuery export structure with RECORD types (e.g., `events_YYYYMMDD` tables). Simply provide the full GA4 export tables - no field extraction required.
2. **Flattened format** - Pre-processed tables with unnested event parameters and properties as individual columns.

Both formats are acceptable. Choose based on your data pipeline capabilities and preferences.

## Required Fields

Based on the [official GA4 BigQuery export schema](https://support.google.com/analytics/answer/7029846), include the following fields:

### Core Event Fields

| Field | Type | Description |
| --- | --- | --- |
| event_date | STRING | Date when the event was logged (YYYYMMDD format) |
| event_timestamp | INTEGER | Time (in microseconds, UTC) when the event was logged |
| event_name | STRING | Name of the event (e.g., page_view, session_start) |
| user_pseudo_id | STRING | Pseudonymous identifier for the user |
| user_id | STRING | User ID set via setUserId API (if available) |

### Nested Records

Include these nested RECORD fields (raw format) or extract relevant subfields (flattened format):

| Field | Type | Key Subfields |
| --- | --- | --- |
| device | RECORD | device.category, device.operating_system |
| event_params | RECORD (repeated) | ga_session_id, ga_session_number, engagement_time_msec, page_location, page_title |
| platform | STRING | Platform where the event originated (web, iOS, Android) |

## Custom Event Parameters

In addition to the standard GA4 fields above, include custom event parameters that identify:

- **Content identifiers**: article_id, content_type, content_group, category
- **User attributes**: subscription_id, customer_id (mapped from user_id)
- **Engagement metrics**: engagement_time_msec, scroll_depth
- **Page/screen data**: page_location, page_title, page_path, screen_name

These parameters are stored in the `event_params` array (raw format) or as individual columns (flattened format).

## Data Synchronization

We recommend including:
- **Sync timestamp field**: A timestamp indicating when the data was synced (e.g., `_fivetran_synced`, `synced_at`)
- **BigQuery partitioning**: Partition by `event_date` for optimal performance

Please inform the Subsets team of your partitioning column and sync timestamp field names.

## Reference

- [Official GA4 BigQuery Export Schema](https://support.google.com/analytics/answer/7029846)
