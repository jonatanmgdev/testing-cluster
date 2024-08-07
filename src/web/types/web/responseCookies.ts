export interface ResponseCookies {
  [key: string]: {
    name: string;
    value: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: boolean | "lax" | "strict" | "none" | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    path?: string;
    expires?: Date;
  };
}