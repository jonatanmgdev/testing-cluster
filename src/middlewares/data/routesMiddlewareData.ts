import { CookieNames } from "@/web/core/config";
import {
  SwitchRoutesAdmin,
  SwitchRoutesCompanies,
  SwitchRoutesWeb,
} from "@/web/core/config/router";

interface ProtectedRoute {
  path: string;
  cookieName: string;
  redirectPath: string;
}

export interface ParametizedRoute {
  path: string;
  param: string;
  validValues: string[];
  defaultValue: string;
}

// Routes with params
export const ParameterizedRoutes: ParametizedRoute[] = [
  {
    path: `${SwitchRoutesWeb.AssociatedCompaniesDetails}`,
    param: 'tablita',
    validValues: ['map', 'list'],
    defaultValue: 'map',
  },
  {
    path: `${SwitchRoutesWeb.AssociatedCompaniesMap}`,
    param: 'tab',
    validValues: ['map', 'list'],
    defaultValue: 'map',
  },
];

// Routes to avoid loading if the user is authenticated.
export const AuthAvoidPublicRoutes: ProtectedRoute[] = [
  {
    path: `${SwitchRoutesWeb.Login}`,
    cookieName: CookieNames.WebAuth,
    redirectPath: SwitchRoutesWeb.Home,
  },
  {
    path: `${SwitchRoutesWeb.Register}`,
    cookieName: CookieNames.WebAuth,
    redirectPath: SwitchRoutesWeb.Home,
  },
  {
    path: `${SwitchRoutesAdmin.Login}`,
    cookieName: CookieNames.AdminAuth,
    redirectPath: SwitchRoutesAdmin.Notifications,
  },
  {
    path: `${SwitchRoutesCompanies.Login}`,
    cookieName: CookieNames.CompaniesAuth,
    redirectPath: SwitchRoutesCompanies.Home,
  },
];

// WEB privated routes
const webPrivatedRoutes: ProtectedRoute[] = [
  {
    path: `${SwitchRoutesWeb.Account}`,
    cookieName: CookieNames.WebAuth,
    redirectPath: SwitchRoutesWeb.Login,
  },
  {
    path: `${SwitchRoutesWeb.AccountCardLink}`,
    cookieName: CookieNames.WebAuth,
    redirectPath: SwitchRoutesWeb.Login,
  },
  {
    path: `${SwitchRoutesWeb.AccountCardRequest}`,
    cookieName: CookieNames.WebAuth,
    redirectPath: SwitchRoutesWeb.Login,
  },
  {
    path: `${SwitchRoutesWeb.AccountCardRequestInfo}`,
    cookieName: CookieNames.WebAuth,
    redirectPath: SwitchRoutesWeb.Login,
  },
];

// COMPANIES privated routes
const companiesPrivatedRoutes: ProtectedRoute[] = [
  {
    path: `${SwitchRoutesCompanies.Home}`,
    cookieName: CookieNames.CompaniesAuth,
    redirectPath: `${SwitchRoutesCompanies.Login}`,
  },
];

// ADMIN privated routes
const adminPrivatedRoutes: ProtectedRoute[] = [
  {
    path: `${SwitchRoutesAdmin.Notifications}`,
    cookieName: CookieNames.AdminAuth,
    redirectPath: SwitchRoutesAdmin.Login,
  },
];

export const privatedRoutesLists = [
  adminPrivatedRoutes,
  companiesPrivatedRoutes,
  webPrivatedRoutes,
];
