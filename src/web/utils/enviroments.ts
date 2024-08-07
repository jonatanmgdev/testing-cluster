import { environments } from "../common/types/enviroments";
export function getCurrentEnvironment(): environments | null {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
    if (environment && Object.values(environments).includes(environment.toUpperCase() as environments)) {
        return environment.toUpperCase() as environments;
    } else {
        throw new Error("El entorno actual no es válido.");
    }
}