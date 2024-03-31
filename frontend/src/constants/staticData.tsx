export type ISigninNames = "email" | "password";

export const signinData = {
  inputs: [
    { id: "1", type: "text", required: true, name: "email" },
    { id: "2", type: "password", required: true, name: "password" },
  ],
  forgotPassLink: "/forgot-password",
  link: "/signup",
};

export const signinPlaceholders = {
  email: "E-mail",
  password: "Password",
};

export const signupData = {
  inputs: [
    { id: "1", type: "text", required: true, name: "email" },
    { id: "2", type: "text", required: true, name: "first_name" },
    { id: "3", type: "text", required: true, name: "last_name" },
    { id: "4", type: "password", required: true, name: "password" },
    { id: "5", type: "password", required: true, name: "passwordConfirm" },
  ],
  link: "/signin",
};

export const signupPlaceholders = {
  email: "E-mail",
  first_name: "First Name",
  last_name: "Last Name",
  password: "Password",
  passwordConfirm: "Re-Enter Password",
};

export const tabsNames = ["Orders", "My Information"];
