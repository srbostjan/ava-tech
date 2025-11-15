/**
 * Application constants
 */

// WhatsApp business number (replace with actual number)
export const WHATSAPP_NUMBER = '5215512345678'; // Format: country code + number (no spaces or symbols)

// Application name
export const APP_NAME = 'E-Commerce Store';

// Future: These will be stored in AWS Systems Manager Parameter Store or Secrets Manager
export const API_CONFIG = {
  // AWS Amplify API endpoint (will be configured after amplify init)
  // graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  // region: process.env.NEXT_PUBLIC_AWS_REGION,
};

// S3 bucket configuration (for future implementation)
export const S3_CONFIG = {
  // bucketName: process.env.NEXT_PUBLIC_S3_BUCKET,
  // region: process.env.NEXT_PUBLIC_AWS_REGION,
  // Structure: s3://bucket-name/products/{productId}/...
};
