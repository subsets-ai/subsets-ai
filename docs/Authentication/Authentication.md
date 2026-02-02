---
sidebar_position: 1
---

# Login Options

Subsets uses Auth0 for authentication. Two login methods are available: Email + Password and OAuth (Google/Microsoft).

## Email + Password

Users join via an email invitation from an existing team member. After receiving the invite, users set a password and can log in.

Organizations can optionally disable invitations if they prefer to manage login via OAuth only.

## Google (OAuth)

Authenticate using existing Google accounts.

**Setup:**
1. Provide your email domain (e.g., `company.com`)
2. Designate initial admin by providing their email address
3. IT admin consent may be required in Google Workspace admin console

**User approval:** Admins approve other users from the same email domain.

## Microsoft (OAuth)

Authenticate using existing Microsoft accounts.

**Setup:**
1. Provide your Azure AD Tenant ID
2. Designate initial admin by providing their `oid` (Object ID)
3. IT admin consent may be required in Azure AD admin console

**User approval:** Admins approve other users from the same tenant.

**Fallback:** If `oid` is unavailable, users can be manually approved by a Subsets super user.

## Notes

- Both methods can be enabled simultaneously.
- You can choose to enable only one method based on your access requirements.
- Contact Subsets support to configure your preferred authentication setup.
