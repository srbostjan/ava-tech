import { defineAuth } from '@aws-amplify/backend';

/**
 * Auth Configuration for E-Commerce CMS
 *
 * Purpose: Admin panel authentication only
 * - Customers: No authentication required (public API Key)
 * - Admins: Email/password login for CMS operations
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Verificación de Email - CMS E-Commerce',
      verificationEmailBody: (createCode) => `Tu código de verificación es: ${createCode()}`,
    },
  },

  // User attributes for admin profiles
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
    givenName: {
      required: false,
      mutable: true,
    },
    familyName: {
      required: false,
      mutable: true,
    },
  },

  // Account recovery
  accountRecovery: 'EMAIL_ONLY',
});
