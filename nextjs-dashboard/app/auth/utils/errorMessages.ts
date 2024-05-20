const errorMessages: { [key: string]: string } = {
    'auth/invalid-email': 'The email address is not valid.',
    'auth/missing-password': 'Please enter a password.',
    'auth/email-already-in-use': 'The email address is already in use.',
    'auth/weak-password': 'The password is too weak.',
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'The password is incorrect.',
    'auth/invalid-credential': 'Incorrect email or password.'
};

export const getFriendlyErrorMessage = (errorCode: string): string => {
    return errorMessages[errorCode] || 'An unknown error occurred. Please try again.';
};
