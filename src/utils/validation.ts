export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_MIN_LENGTH = 6;

export const validateEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
};

export const validatePasswordLength = (password: string) => {
    return password.length >= PASSWORD_MIN_LENGTH;
};