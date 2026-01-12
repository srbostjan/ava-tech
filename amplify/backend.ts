import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * E-Commerce Backend Configuration
 *
 * Resources:
 * - auth: Cognito authentication for CMS administrators
 * - data: AppSync GraphQL API with DynamoDB for products & analytics
 *
 * @see https://docs.amplify.aws/react/build-a-backend/
 */
defineBackend({
  auth,
  data,
});
