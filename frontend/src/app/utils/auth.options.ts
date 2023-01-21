import { HttpRequest } from "@angular/common/http";
import { InjectionToken } from "@angular/core";

export const AUTH_TOKEN_INTERCEPTOR_FILTER =
    new InjectionToken<(req: HttpRequest<any>) => boolean>('Interceptor Filter');

export function noOpInterceptorFilter(req: HttpRequest<any>): boolean {
    if (req.url.includes("sessions") || req.url.includes("count") || req.url.includes('checkEmailUniqu'))
        return true;
    return false
}