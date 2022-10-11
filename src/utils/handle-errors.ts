const getError = (error: any): string => {
  return error.error.response.data.message;
};

export default getError;
