---
sidebar_position: 3
---

# Piano

Subsets supports syncing data to Piano using the [Update user](https://docs.piano.io/api?endpoint=post~2F~2Fpublisher~2Fuser~2Fupdate) `/publisher/user/update` API endpoint.

The following four Custom Fields in Piano ID will be created:
```
{
  'subsets_experiment_id',
  'subsets_experiment_added_at',
  'subsets_experiment_name',
  'subsets_subscriber_churn_risk'
}
```

## Setup guide
Provide the following for both your production and sandbox environments.
1. Share the Application Id and API Token from your Piano dashboard.
2. Share your base urls (eg. `api.piano.io`, `sandbox.piano.io`).

## Custom contacts properties
Please add the following custom fields for users (https://docs.piano.io/custom-fields-in-piano-id/#createfields). 

| Field Id                      | Title                                                                  | FieldType | Description                                                                                                                                                        |
|-------------------------------|------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subsets_experiment_id         | Subsets Experiment Id                                                  | text      | Indicates the contact is selected to participate in a Subsets retention experiment. The experiment id is provided when creating an experiment in Subsets platform. |
| subsets_experiment_added_at   | Subsets datetime for when the subscription was added to the experiment | date      | Indicates the date and time the contact was selected to participate in a Subsets retention experiment.                                                             |
| subsets_experiment_name       | Subsets experiment name.                                               | text      | Subsets descriptive name of experiment.                                                                                                                            |
| subsets_subscriber_churn_risk | Subsets probability subscriber will churn within 30 days.              | number    | Subsets probability subscriber will churn within 30 days.                                                                                                          |
| subsets_experiment_assignment | Subsets Experiment Treatment or Control assignment                     | text      | Indicates if the subscriber is in the experiments treatment or control group.                                                                                      |
