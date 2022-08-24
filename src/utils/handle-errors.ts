const getError = (error: any): string => {
  let message = "error.signUp";
  if (error.response.data.code === -10) {
    message = "errors.userExists";
  }
  return message;
};

export default getError