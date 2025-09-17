import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const SKIP_URLS = ['/authentication/login', '/authentication/register'];


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (SKIP_URLS.some(url => req.url.includes(url))) return next(req);

  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
