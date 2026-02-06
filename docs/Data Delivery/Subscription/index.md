---
sidebar_position: 1
---

# Subscription

This data represents the lifecycle of your subscriptions, including when subscribers sign up, complete trials, enter payment-failure grace periods, cancel, and expire. We need both the current state **and** history of subscriptions.

## Platform-Specific Schemas

If you use one of the following subscription management platforms, see the platform-specific documentation:

- [Piano](/Data%20Delivery/Subscription/Piano)

## General Format Options

If you're not using one of the platforms above, subscription data is typically stored in one of these formats:

1. [Billing period-based](/Data%20Delivery/Subscription#billing-period-based)
2. [Lifecycle event-based](/Data%20Delivery/Subscription#lifecycle-event-based)

Apart from the subscription data, other demographic (non-PII) data is also valuable:

- Gender
- Postal / Zip code, Region, County etc.
- Age-group
- Marketing segments
- Others…

**Data that should not be shared**
- Full name
- Address
- Date of birth
- Financial and Payment information (credit card information etc.)
- IP address
- Telephone / Mobile number
- Email address
- Login credentials or passwords
- Personal Identification Numbers (National identification numbers, passport number etc.)

## Billing period-based

This format usually consists of multiple tables (including the following) but might be slightly different and more or less normalised.

**Subscription_periods**: Multiple rows per subscription, each representing a billing period.

| Column | subscription_id | period_begin | period_end | plan | price |
| --- | --- | --- | --- | --- | --- |
| Description | The unique identifier of a subscription. | Start date of the billing-period. | End date of the billing-period. The next upcoming “billing-date”. | What product is being subscribed to and on what terms. | price billed per period. |
| Example: first period | 0001 | 01-01-2024 | 01-02-2024 | 2024-monthly | 9.99 |
| Example: upgrade | 0001 | 01-02-2024 | 01-03-2024 | 2024-yearly | 99.99 |

**Subscriptions**: One row per subscription.

| Column | subscription_id | customer_id | created_at | cancelled_at | expired_at | trial_begin_at | trial_end_at | signup_campaign_id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Description | The unique identifier of a subscription | A customer might have multiple subscription. | Signup date | Date of the actual cancellation using website, customer support or other. | Date when the subscription no longer has access to the product. |  |  |  |
| Example: (cancelled) | 0001 | 001 | 01-01-2024 | 20-03-2024 | 01-04-2024 | 01-01-2024 | 31-01-2024 | 30-day-half-price |
| Example: (active) | 0002 | 002 | 01-01-2024 | null | null | null | null | null |

## Lifecycle event-based

This format usually consists of multiple tables, with a main event table being the most important to share with Subsets. The table in your data warehouse might be slightly different and more or less normalised.

*Subscription_events*: each row represents an event in the subscription lifecycle.

| Column | subscription_id | event_timestamp | event_type | plan | price | next_billing_date_at |
| --- | --- | --- | --- | --- | --- | --- |
| Description | The unique identifier of a subscription. | The timestamp of when the event happened | a fixed set of lifecycle events eg. signup, renewal, payment_failure, cancellation, upgrade, trial_started and expiration. | What product is being subscribed to and on what terms. | price billed | Date of the next billing event |
| Example | 0001 | 01-01-2024 | CREATION | 2024-monthly | 9.99 | 01-02-2024 |
| Example | 0001 | 01-02-2024 | RENEWAL | 2024-monthly | 9.99 | 01-03-2024 |
| Example | 0001 | 01-03-2024 | PAYMENT_FAILURE | 2024-monthly | 9.99 | 01-03-2024 |
| Example | 0001 | 01-04-2024 | EXPIRATION | 2024-monthly | 9.99 | 01-03-2024 |

## Other

If your data follows a different format, share tables that allow us to track:

1. When the subscription was **created.**
2. Every **renewal** billing event.
3. If and when a **trial** started and ended.
4. If and when the subscription entered **payment_failure.**
5. An **upgrade**/downgrade/crossgrade to a different subscription plan.
6. When the subscription was **canceled.**
7. When the subscription **expired**.

Ensure every table has a subscription_id and, if applicable, a customer_id.