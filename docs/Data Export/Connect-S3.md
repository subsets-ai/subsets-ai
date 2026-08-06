---
sidebar_position: 2
slug: /data-export/connect-s3
---

# Connect your Amazon S3 bucket

Subsets delivers the [scheduled export feeds](Data-Contract.md) into an S3 bucket you own.

Access is keyless: per delivery, the Subsets service account exchanges a Google-signed OIDC identity token at AWS STS (`AssumeRoleWithWebIdentity`) for one-hour temporary credentials scoped to a single role in your account. There are no access keys to store or rotate, and you revoke access at any time by deleting the role. The role is write-only (`PutObject` under your chosen prefix, nothing else) and its trust policy pins the exact Subsets service account and your organization's delivery session, so no other party - and no other Subsets organization - can assume it.

## Prerequisites

- An AWS account with permission to create an S3 bucket and an IAM role.
- Admin access to your Subsets organization (**Settings → Data Export**).

## 1. Create a bucket and pick a prefix

Any bucket, any region - for example `acme-subsets-data`. Pick the key prefix now too; it is baked into the IAM policy in the next step. We recommend `subsets/`.

- **The prefix must end with `/`.** The delivery layout and the policy resource pattern concatenate it directly: `subsets` without the slash produces keys like `subsetsexperiment-enrollments/...` and a policy that matches `subsetsanything`.
- **Encryption:** default SSE-S3 (AES256) works out of the box. SSE-KMS with a customer-managed key does **not** work with the policy below alone - the role additionally needs `kms:GenerateDataKey` on the CMK and a corresponding key-policy grant. Tell Subsets if your bucket enforces KMS.

## 2. Create the IAM role

Create a role named exactly `subsets-data-export-role` - Subsets derives the role ARN from your AWS account id plus this fixed name, so there is no ARN to copy back. **Copy both policies from Settings → Data Export**; the app fills in the Subsets service-account id and your organization's session name.

**Trust policy** (replace `<AWS_ACCOUNT_ID>` with your 12-digit AWS account id):

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

No IAM OIDC identity-provider resource is needed: `accounts.google.com` is a built-in AWS web-identity provider. If you author this in IaC, note the condition key is `oaud`, not `aud` - for Google tokens AWS maps `aud` to the token's `azp` claim and `oaud` to the `aud` claim Subsets sets.

**Permission policy** (replace `<BUCKET>` and `<PREFIX>`):

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

Don't try to verify the setup with this role yourself - it is write-only by design and cannot list or read anything. The validation step below is the connectivity check.

## 3. Enter the destination in Subsets

In **Settings → Data Export**, enter your AWS account id (12 digits), the bucket name, and the prefix. The bucket's region is detected automatically; a manual region field is available if detection fails.

## 4. Validate

Start validation from the same tab. Subsets writes `<prefix>_validation/subsets-validation.txt` to your bucket; open it with your **own** read-capable credentials and paste the code it contains back into the app. This proves both halves of the connection - Subsets can write, you can read.

Feeds cannot be enabled, and nothing is delivered, until validation passes. Changing any destination field later clears the validation and requires re-validating.

## 5. Enable feeds

Turn on the feeds you want, independently. The first snapshot is delivered on the next run, and per-feed delivery health is visible in the same tab.
