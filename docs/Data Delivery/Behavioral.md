---
sidebar_position: 2
---

# Behavioral

Should contain:

1. Events representing your subscribers’ interactions with your products and relevant metadata. 
2. Product data from your CMS representing articles and other content, and the categorisation/taxonomy of that content.

The interaction events should be as raw as possible and not aggregated in any way.

Examples:

- Pageviews (with content tags or category)
- Website sessions (Time spent on page)
- Article reads (with article_id, tags or category)
- Device type: mobile, tablet, PC
- Customer support tickets (status, tags, or category)
- Ratings/bookmarks (with eg. article_id and rating value)
- Physical deliveries of product
- Forum comments

In cases where data volumes are extremely large, we might consider some form of aggregation, depending on how we choose to make the actual data connection. The Subsets team will discuss this with you.