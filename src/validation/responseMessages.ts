export const StatusCodes = {
  Success: {
    Created: 201,
    Ok: 200,
  },
  DataFound: {
    Found: 302,
  },
  ClientError: {
    BadRequest: 400,
    NotFound: 404,
  },
  ServerError: {
    InternalServerError: 500,
  },
};

export const SuccessMessages = {
  RegisterSuccess: "User Register successful",
  SignInSuccess: "User Signed In",
};

export const ErrorMessages = {
  EmailInvalid: "Invalid email format",
  UserExists: (email: string) => `User with email ${email} already exists`,
  PasswordRequirements:
    "Password must have at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-)",
  UserNotFound: "User not found",
  IncorrectCredentials: "Incorrect email or password",
  SomethingWentWrong: "Something went wrong",
  RegisterError: "Error in user register",
  LoginError: "Error in user login",
  MissingFields: (missingFieldsMessage: string) =>
    ` ${missingFieldsMessage} field is required`,
};
