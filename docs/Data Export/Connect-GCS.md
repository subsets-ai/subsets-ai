---
sidebar_position: 3
slug: /data-export/connect-gcs
---

# Connect your Google Cloud Storage bucket

Subsets delivers the [scheduled export feeds](Data-Contract.md) into a GCS bucket you own. The delivery layout is identical to S3 (`gs://` instead of `s3://`).

Access is keyless and even simpler than S3: the Subsets service account writes to your bucket directly once you grant it a single IAM role there. No keys, no trust policy, no region, no account id - the grant is the whole contract, and you revoke it at any time by removing the grant.

## Prerequisites

- A Google Cloud project with permission to create a bucket and grant IAM roles on it.
- Admin access to your Subsets organization (**Settings → Data Export**).

## 1. Create a bucket and pick a prefix

Any location and storage class, with **uniform bucket-level access** and public access prevention on. Pick an object prefix if desired - we recommend `subsets/`, and **it must end with `/`** (the delivery layout concatenates it directly).

- A bucket **retention policy is supported**. Daily files are new objects and a retried delivery of an unchanged file is skipped, so routine delivery never trips the lock. The lock only delays rewriting an existing file with *changed* content - a same-day correction, an updated `_schema/SCHEMA.md`, re-validation after a destination change - until that file's retention expires. Tip: add the retention policy after validation passes.
- Do **not** enable default object holds, and do **not** enable Requester Pays. Holds block file updates indefinitely; Requester Pays deliveries are refused because Subsets doesn't send a billing project.

## 2. Grant the Subsets service account access

Grant the Subsets service account - its email is shown in **Settings → Data Export** - the **Storage Object User** role (`roles/storage.objectUser`) on the bucket. Bucket-scoped, not project-scoped. `Storage Object Creator` is not enough: overwriting an object needs `storage.objects.delete`.

Enterprise org-policy caveats:

- **Domain Restricted Sharing** (`iam.allowedPolicyMemberDomains`) blocks granting an external principal - your admins must allow the Subsets domain first.
- A **VPC Service Controls** perimeter around Cloud Storage denies the writes even with a correct grant - it needs an ingress rule for the service account.
- A **CMEK-encrypted** bucket additionally needs the same service account granted `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the bucket's key.

## 3. Enter the destination in Subsets

In **Settings → Data Export**, enter the bucket name and the prefix. That's it - no region, no account id.

## 4. Validate

Start validation from the same tab. Subsets writes `<prefix>_validation/subsets-validation.txt` to your bucket; open it and paste the code it contains back into the app. This proves both halves of the connection - Subsets can write, you can read.

There is no pre-flight bucket check on GCS, so this write is the first real signal; if it fails, the error shown distinguishes bucket-not-found, missing grant, retention policy, Requester Pays, KMS and VPC Service Controls causes.

Feeds cannot be enabled, and nothing is delivered, until validation passes. Changing any destination field later clears the validation and requires re-validating.

## 5. Enable feeds

Turn on the feeds you want, independently. The first snapshot is delivered on the next run, and per-feed delivery health is visible in the same tab.
