---
sidebar_position: 2
---

# Behavioral

Behavioral data represents your subscribers' interactions with your products and content. This includes website visits, article reads, app usage, and other engagement activities.

## What to Include

Behavioral data should contain:

1. **Event data**: Raw, unaggregated events representing subscriber interactions (pageviews, sessions, clicks, etc.)
2. **Content metadata**: Product data from your CMS including articles, videos, podcasts, and their categorization/taxonomy

## Event Types

Examples of behavioral events:

- Pageviews (with content tags or category)
- Website sessions (time spent on page)
- Article reads (with article_id, tags, or category)
- Device type: mobile, tablet, PC
- Customer support tickets (status, tags, or category)
- Ratings/bookmarks (with article_id and rating value)
- Physical deliveries of product
- Forum comments

## Platform-Specific Schemas

Select your analytics platform below for detailed schema requirements:

- [Google Analytics 4 (GA4)](/Data%20Delivery/Behavioral/GA4)

## Data Volume Considerations

The interaction events should be as raw as possible and not aggregated. In cases where data volumes are extremely large, we might consider some form of aggregation, depending on how we choose to make the actual data connection. The Subsets team will discuss this with you.