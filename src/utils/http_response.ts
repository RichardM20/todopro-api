import { messageErrorHandler } from "./errors/msg_error_handler";

export const HttpResponse = <T>(
  res,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).send({
    statusCode: statusCode,
    message: message,
    data: data,
  });
};

export const HttpBadResponse = <T>(
  res,
  statusCode: number,
  message: string | unknown,
  data?: T
) => {
  const errorMessage = messageErrorHandler(message);
  return res.status(statusCode).send({
    statusCode: statusCode,
    message: errorMessage,
    data: data,
  });
};
