import { AxiosResponse } from "axios";
import { ApiResponse } from "./commonTypes";

export enum apiStatus {
  Success = 200,
  Created = 201,
  NoContent = 204,
  emailCouldNotBeSent = 233,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  Gone = 410,
  TooManyRequests = 429,
  SmsCouldNotBeSent = 432,
  AccountNotActivated = 433,
  InternalServerError = 500,
  NotImplemented = 501,
  ServiceUnavailable = 503,
  notAcceptable = 406,
  None = 0,
}

export namespace apiStatus {
  export const Messages: Record<number, string> = {
    [apiStatus.Success]: "Completado con éxito.",
    [apiStatus.Created]: "Añadido con éxito.",
    [apiStatus.NoContent]: "No se encontraron resultados.",
    [apiStatus.emailCouldNotBeSent]: "El correo no pudo ser enviado.",
    [apiStatus.BadRequest]: "Los datos facilitados no son correctos.",
    [apiStatus.Unauthorized]: "No autorizado.",
    [apiStatus.Forbidden]: "Acceso denegado.",
    [apiStatus.NotFound]: "No se ha encontrado el contenido.",
    [apiStatus.MethodNotAllowed]: "Este método no está permitido.",
    [apiStatus.Conflict]: "Ha habido un conflicto con el servidor.",
    [apiStatus.Gone]: "El recurso solicitado ya no existe.",
    [apiStatus.TooManyRequests]: "Demasiadas solicitudes en un corto plazo de tiempo.",
    [apiStatus.SmsCouldNotBeSent]: "El SMS no pudo ser enviado.",
    [apiStatus.AccountNotActivated]: "La cuenta no ha sido activada.",
    [apiStatus.InternalServerError]: "Error interno del servidor.",
    [apiStatus.NotImplemented]: "Metodo no implementado.",
    [apiStatus.ServiceUnavailable]: "Servicio no disponible.",
    [apiStatus.notAcceptable]: "No aceptado.",
    [apiStatus.None]: "Error no identificado.",
  };
}

export function getApiMessage(code: number): string {
  return apiStatus.Messages[code] || "Unknown error";
}

export function assignApiStatus(responseStatus: number): apiStatus {
  const statusValues = Object.values(apiStatus).filter((value) => typeof value === "number");
  for (const status of statusValues) {
    if (status === responseStatus) {
      return status;
    }
  }
  return apiStatus.None;
}

export function getApiResponse(response: AxiosResponse<any, any>): ApiResponse<any> {
  let apiResponse: ApiResponse<any> = {};

  if (response) {
    const headerToken = response.config.headers["Authorization"] ?? "";
    const headerRefreshToken = response.config.headers["refresh-token"] ?? "";
    const token = typeof headerToken === "string" ? headerToken.replace("Bearer ", "") : headerToken;

    const cookieTokens = {
      token: token,
      refreshToken: headerRefreshToken,
    };

    const status = assignApiStatus(response.status);

    apiResponse = {
      status: status,
      data: response.data,
      cookieValues: cookieTokens,
    };
  }

  return apiResponse;
}
