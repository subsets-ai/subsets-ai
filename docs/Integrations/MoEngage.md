---
sidebar_position: 8
---

# MoEngage

Subsets supports syncing data to MoEngage using the bulk customer import endpoint. Each call carries a batch of `customer` updates. Subsets fetches campaign details from the [Email Campaign Details](https://developers.moengage.com/hc/en-us/articles/27896777540756-Get-Email-Campaign-Details) `core-services/v1/campaigns/search` endpoint to link campaigns to experiments.

The following customer attributes are created on each user in MoEngage:
```
{
  'subsetsExperimentId',
  'subsetsExperimentName',
  'subsetsExperimentAddedAt',
  'subsetsSubscriberChurnRisk',
  'subsetsExperimentAssignment'
}
```

## Authentication

MoEngage uses dual authentication on every request:
1. **Basic Auth header** — `Authorization: Basic base64(workspace_id:api_key)`
2. **App key header** — `MOE-APPKEY: {app_id}`

Customer export uses the Data API key as the Basic Auth password; campaign lookups use the Campaign API key.

## Setup guide

1. In MoEngage, go to **Settings → APIs** and create Data API and Campaign API credentials.
2. Share the credentials listed below.

### Required credentials

| Credential       | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| API Region       | Data center identifier in your API host, e.g. `01` (the `{region}` in `api-{region}.moengage.com`) |
| App ID           | MoEngage Application ID / Workspace ID (sent in the `MOE-APPKEY` header)                         |
| Workspace ID     | Workspace ID used as the Basic Auth username                                                    |
| Data API Key     | API key for customer export (Basic Auth password)                                               |
| Campaign API Key | API key for fetching campaign details                                                           |
