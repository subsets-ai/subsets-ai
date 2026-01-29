---
sidebar_position: 1
---

# Login Options

Subsets uses Auth0 for authentication. Two login methods are available: Email + Password and OAuth (Google/Microsoft).

## Email + Password

Users join via an email invitation from an existing team member. After receiving the invite, users set a password and can log in.

Organizations can optionally disable invitations if they prefer to manage login via OAuth only.

## Google / Microsoft (OAuth)

OAuth login allows users to authenticate using their existing Google or Microsoft accounts.

To enable OAuth for your organization:

1. **Provide your organization identifier**
   - Google: your email domain (e.g., `company.com`)
   - Microsoft: your Azure AD Tenant ID

2. **IT admin consent (may be required)** - Your IT admin may need to approve/consent to the Subsets application in your identity provider's admin console.

3. **Platform access approval** - Even after a successful OAuth login, users will require approval by an admin before gaining access.

## Notes

- Both methods can be enabled simultaneously.
- You can choose to enable only one method based on your access requirements.
- Contact Subsets support to configure your preferred authentication setup.
