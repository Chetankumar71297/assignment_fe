import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]+$/, "Only letters,underscore and spaces are allowed.")
    .min(2, "Name must be 2 to 16 characters long.")
    .max(16, "Name must be 2 to 16 characters long."),
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address."),
  /*mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
      "Provide valid Indian mobile number"
    ),*/
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be atleast 6 characters long and should contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character."
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address."),
  password: Yup.string().required("Password is required."),
});
