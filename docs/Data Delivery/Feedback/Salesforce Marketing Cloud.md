---
sidebar_position: 7
---

# Salesforce Marketing Cloud

Feedback data from Salesforce Marketing Cloud (SFMC) is delivered via the platform's **System Data Views** — SQL-queryable pseudo-tables that capture email engagement events across Journey Builder sends. Subsets uses this data to verify subscriber exposure to campaigns and measure treatment effects.

## Required data views

The following System Data Views should be extracted and delivered to Subsets:

| Data View | Events captured |
|---|---|
| `_Sent` | One record per email send per subscriber |
| `_Open` | Email opens (unique and repeat) |
| `_Click` | Link clicks, including URL and link name |
| `_Bounce` | Delivery failures (hard, soft, block) |
| `_Unsubscribe` | Unsubscribe events |
| `_JourneyActivity` | Journey activity metadata — used to join sends to journeys |
| `_Journey` | Journey metadata (name, version, status) |

## Required fields

At minimum, include the following fields from each engagement data view (`_Sent`, `_Open`, `_Click`, `_Bounce`, `_Unsubscribe`):

| Field | Description |
|---|---|
| `SubscriberKey` | Contact/subscriber identifier |
| `EventDate` | Timestamp of the event |
| `JobID` | Email send job identifier |
| `TriggererSendDefinitionObjectID` | Join key to `_JourneyActivity` |

For `_Click`, also include `URL`, `LinkName`, and `IsUnique`.

For `_Bounce`, also include `BounceCategory` (e.g. `Hard`, `Soft`, `Block`), `SMTPCode`, and `SMTPBounceReason`.

From `_JourneyActivity`, include:

| Field | Description |
|---|---|
| `VersionID` | Journey version identifier (joins to `_Journey`) |
| `ActivityID` | Unique activity node identifier |
| `ActivityName` | Human-readable activity label |
| `ActivityType` | Channel type (e.g. `Email`, `SMS`, `Wait`) |
| `JourneyActivityObjectID` | Join key to engagement data views via `TriggererSendDefinitionObjectID` |

From `_Journey`, include:

| Field | Description |
|---|---|
| `JourneyID` | Unique journey identifier (consistent across versions) |
| `JourneyName` | Journey display name |
| `VersionNumber` | Journey version number |
| `JourneyStatus` | e.g. `Running`, `Finished`, `Stopped` |

## Joining journey context

Email engagement events are linked to Journey Builder activities using the following join:

```sql
_JourneyActivity.JourneyActivityObjectID = _Sent.TriggererSendDefinitionObjectID
```

## Example query

The following AMPscript/SQL query (run in Automation Studio) extracts sent events enriched with journey context:

```sql
SELECT
    s.SubscriberKey,
    s.EventDate,
    s.JobID,
    s.TriggererSendDefinitionObjectID,
    ja.ActivityID,
    ja.ActivityName,
    ja.ActivityType,
    j.JourneyID,
    j.JourneyName,
    j.VersionNumber
FROM _Sent s
JOIN _JourneyActivity ja
    ON ja.JourneyActivityObjectID = s.TriggererSendDefinitionObjectID
JOIN _Journey j
    ON j.VersionID = ja.VersionID
WHERE s.EventDate >= DATEADD(day, -1, GETDATE())
```

Equivalent queries can be written for `_Open`, `_Click`, `_Bounce`, and `_Unsubscribe` using the same join pattern.

## Important notes

- **30-day retention limit**: System Data Views only retain data for 30 days. We recommend extracting and delivering data to Subsets on a **daily schedule** to avoid data loss.
- **Sync timestamp**: Include a timestamp indicating when the data was exported (e.g. an `exported_at` column). This allows Subsets to track data freshness and identify incremental updates.
- **BigQuery partitioning**: If delivering via BigQuery, partition your tables by event date or export date. Please inform the Subsets team of your partitioning column name and strategy.

## Official documentation

- [System Data Views — Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mc_as_data_view_about.htm&type=5)
- [Data View: Journey](https://help.salesforce.com/s/articleView?id=mktg.mc_as_data_view_journey.htm&language=en_US&type=5)
- [Data View: Journey Activity](https://help.salesforce.com/s/articleView?id=sf.mc_as_data_view_journey_activity.htm&language=en_US&type=5)
- [Journey Builder API Overview — Salesforce Developers](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/journey-builder-api-overview.html)
