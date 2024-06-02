export const isEmailValid = (email: string): unknown => {
  return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
};
export const isNameValid = (name: string): unknown => {
  return name.length >= 3;
};
export const isMobileNumberValid = (mobileNumber: string): unknown => {
  return mobileNumber.match(/^\d{10}$/);
};
export const isPasswordStrong = (password: string): unknown => {
  return /(?=.*[a-z])(?=.*[~!@#$%^&*()])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})/.test(
    password,
  );
};
export const isPasswordMatched = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};
export const isNameContainsNumber = (name: string): unknown => {
  return /\d/.test(name);
};
