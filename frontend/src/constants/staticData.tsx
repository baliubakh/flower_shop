export type ISigninNames = "email" | "password";

export const signinData = {
  title: "Sign in",
  subtitle: "Sign in and have more fun",
  inputs: [
    { id: "1", type: "text", required: true, name: "email" },
    { id: "2", type: "password", required: true, name: "password" },
  ],
  rememberMe: "Remember Me",
  submitBtn: "Sign in",
  ask: "Don't have an account?",
  forgotPassText: "Forgot Password",
  forgotPassLink: "/forgot-password",
  linkText: "Sign up",
  link: "/signup",
};

export const signinPlaceholders = {
  email: "E-mail",
  password: "Password",
};

export const signupData = {
  title: "Sign up",
  subtitle: "Sign up and help us help you",
  inputs: [
    { id: "1", type: "text", required: true, name: "email" },
    { id: "2", type: "text", required: true, name: "first_name" },
    { id: "3", type: "text", required: true, name: "last_name" },
    { id: "4", type: "password", required: true, name: "password" },
    { id: "5", type: "password", required: true, name: "passwordConfirm" },
  ],
  submitBtn: "Sign up",
  ask: "Already have an account?",
  linkText: "Sign in",
  link: "/signin",
};

export const signupPlaceholders = {
  email: "E-mail",
  first_name: "First Name",
  last_name: "Last Name",
  password: "Password",
  passwordConfirm: "Re-Enter Password",
};

export const tabsNames = ["Dashboard", "Orders", "My Information", "Comments"];
