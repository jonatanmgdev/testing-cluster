import { AuthCookie } from "@/web/core/config";

export interface ContextProp {
  children: JSX.Element;
  auth?: AuthCookie | undefined;
}