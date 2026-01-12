// src/app/AmplifyProvider.tsx
'use client';

import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json'; // Adjust path as necessary
import '@aws-amplify/ui-react/styles.css';
import React from 'react';

Amplify.configure(outputs, {
  ssr: true,
});

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
