---
sidebar_position: 1
---

# Sailthru

Subsets supports syncing data to Sailthru using the [Job - Update](https://getstarted.meetmarigold.com/engagebysailthru/Content/developers/api/job-update.html?tocpath=Technical%20Documents%7CFor%20Developers%7CAPI%20Endpoints%7C_____10) - `/job` API endpoint.

The following four Custom Attributes will be created in Sailthru:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide
1. Share API key and secret for your production enviroment. The key can be found by navigating to [Sailthru API Settings.](https://my.sailthru.com/settings/api_postbacks).
