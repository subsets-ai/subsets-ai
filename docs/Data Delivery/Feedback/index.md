---
sidebar_position: 3
---

# Feedback

Feedback events should contain events from your marketing automation/CRM/ESP system, representing communication with your subscribers via email, push notification, in-app messaging, and other channels. We use this data to verify a subscriber's exposure to a campaign.

## Platform-Specific Schemas

Select your ESP/marketing automation platform below for detailed schema requirements:

- [Sailthru](/Data%20Delivery/Feedback/Sailthru)
- [HubSpot](/Data%20Delivery/Feedback/HubSpot)
- [Braze](/Data%20Delivery/Feedback/Braze)
- [Agillic](/Data%20Delivery/Feedback/Agillic)
- [Adobe Campaign](/Data%20Delivery/Feedback/Adobe)

## Data Synchronization

When delivering feedback data to Subsets, we recommend including:

- **Sync timestamp field**: A timestamp indicating when the data was synced/exported (e.g., `_fivetran_synced`, `synced_at`, `exported_at`). This allows Subsets to track data freshness and identify incremental updates.

- **BigQuery partitioning**: If using BigQuery, partition your tables by date (typically using the sync timestamp or event timestamp). This improves query performance and reduces costs. Please inform the Subsets team of your partitioning column name and strategy.