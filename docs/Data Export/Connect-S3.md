---
sidebar_position: 2
slug: /data-export/connect-s3
---

# Connect your Amazon S3 bucket

Subsets delivers the [scheduled export feeds](Data-Contract.md) into an S3 bucket you own. You need an AWS account and about 30 minutes; console and IaC both work.

## How access works - no keys

Subsets never holds AWS credentials. Per delivery, the Subsets service account exchanges a Google-signed OIDC identity token at AWS STS (`AssumeRoleWithWebIdentity`) for one-hour temporary credentials scoped to a single role in your account. There is nothing to store, leak or rotate on either side, and you revoke access at any time by deleting the role or its trust policy.

The role is deliberately narrow:

- **Write-only.** It can `PutObject` under your chosen prefix and nothing else - it cannot list or read back objects.
- **Pinned to Subsets.** The trust policy pins the exact Subsets service account (`accounts.google.com:sub`) and your organization's delivery session name, so no other party - and no other Subsets organization - can assume it.
- **Fixed name.** The role must be named `subsets-data-export-role`. Subsets derives the role ARN from your AWS account id plus this fixed name, so there is no hand-copied ARN to get wrong.

## 1. Create a bucket and pick a prefix

Any bucket, any region - for example `acme-subsets-data`. Pick the key prefix now too; it is baked into the IAM policy in the next step. We recommend `subsets/`.

- **The prefix must end with `/`.** Both the delivery layout and the policy resource pattern concatenate it directly: `subsets` without the slash produces keys like `subsetsexperiment-enrollments/...` and a policy that matches `subsetsanything`.
- **Encryption:** default SSE-S3 (AES256) works out of the box. SSE-KMS with a customer-managed key does **not** work with the policy below alone - the role additionally needs `kms:GenerateDataKey` on the CMK and a corresponding key-policy grant. Tell Subsets if your bucket enforces KMS.
- **Lifecycle is yours.** Subsets only ever writes and never deletes; your own lifecycle rules decide how long delivered files survive.

## 2. Create the IAM role

Create a role named exactly `subsets-data-export-role`. **Copy both policies from Settings → Data Export in the Subsets app** - the app fills in the values specific to you (the Subsets service-account id and your organization's session name). The templates look like this:

**Trust policy** - replace `<AWS_ACCOUNT_ID>` with your 12-digit AWS account id; the app supplies `<SUBSETS_SERVICE_ACCOUNT_ID>` and `<YOUR_ORGANIZATION_ID>`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "accounts.google.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "accounts.google.com:oaud": "arn:aws:iam::<AWS_ACCOUNT_ID>:role/subsets-data-export-role",
          "accounts.google.com:sub": "<SUBSETS_SERVICE_ACCOUNT_ID>",
          "sts:RoleSessionName": "subsets-export-<YOUR_ORGANIZATION_ID>"
        }
      }
    }
  ]
}
```

No IAM OIDC identity-provider resource is needed on your side: `accounts.google.com` is a built-in AWS web-identity provider. If you author this in IaC, note the condition key is `oaud`, not `aud` - for Google tokens AWS maps `accounts.google.com:aud` to the token's `azp` claim and `accounts.google.com:oaud` to the `aud` claim Subsets sets. The `oaud` value must equal the role's own ARN, so it changes with your account id.

**Permission policy** (write-only, prefix-scoped) - replace `<BUCKET>` and `<PREFIX>`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::<BUCKET>/<PREFIX>*"
    }
  ]
}
```

Do not try to verify the setup using this role yourself - it is write-only by design and cannot list or read anything. The validation step below is the connectivity check.

## 3. Enter the destination in Subsets

In **Settings → Data Export**, enter:

- AWS account id (12 digits)
- Bucket name
- Bucket region (e.g. `us-east-1`)
- Key prefix, if any

## 4. Validate - the round-trip test

From the same tab, start validation. Subsets writes a small file to your bucket:

```
<prefix>_validation/subsets-validation.txt
```

Open it with your **own** read-capable credentials (the export role cannot read), and paste the code it contains back into the app. This proves both halves of the connection - Subsets can write, and you can read - and marks the destination validated.

Feeds cannot be enabled, and nothing is delivered, until validation passes. Changing any destination field later clears the validation and requires re-validating.

## 5. Enable feeds

Turn on the feeds you want - [experiment enrollments, audience memberships, subscription risk](Data-Contract.md) - independently. The first snapshot is delivered on the next run, and per-feed delivery health is visible in the same tab. A `_schema/SCHEMA.md` file in your bucket documents your exact layout, integrations and table definitions.
