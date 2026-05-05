import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Auth } from "../auth/auth";


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authServices = inject(Auth);
    const authToken = authServices.getToken();

    if (authToken) {
        const authReq = req.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${authToken}`
            })
        });
        return next(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    authServices.removeToken();
                    authServices.removeCurrentUser();
                    window.location.reload();
                }
                return throwError(() => error);
            })
        );
    }
    return next(req);
};