import { Auth } from 'aws-amplify';

export default async function fetchWithAuth(url, options = {}) {
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub;  // Cognito User ID

    // Set headers for authenticated request if they don't already exist
    options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,  // Add ID token for authorization
        'x-user-id': userId  // Example of adding userId to headers (optional)
    };

    return fetch(url, options);
}
