// src/awsConfig.js

import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    region: 'us-east-2', // Your AWS region
    userPoolId: 'us-east-2_example', // Your Cognito User Pool ID
    userPoolWebClientId: 'exampleclientid12345', // Your App Client ID
  },
  // Add other AWS configurations here (API, Storage, etc.)
};

Amplify.configure(awsConfig);
