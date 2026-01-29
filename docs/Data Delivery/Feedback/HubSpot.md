---
sidebar_position: 3
---

# HubSpot

Feedback data from HubSpot is the [HubSpot email events](https://developers.hubspot.com/beta-docs/guides/api/analytics-and-events/email-analytics#email-events) where recipient (email) has been removed and a suitable identifier has been added. (if possible also include the `campaign_name` and `email_subject_line`).

The following fields are required:
- type
- emailCampaignId
- created
- recipient (replaced with suitable identifier)

and `type` include the following events:
- SENT
- DELIVERED
- BOUNCE
- OPEN
- CLICK

## Example

```json
{
    "created": 1401715744000,
    "emailCampaignId": 13054799,
    "recipient": "<REMOVED and replace with internal id>",
    "type": "DELIVERED"
}
```
