/* eslint-disable @typescript-eslint/no-explicit-any */

export const getErrorMessage = (error: any) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};
