export interface FirebaseError extends Error {
  code: string;
  message: string;
}

export interface FormInputs {
  name: string;
  email: string;
  password: string;
}
