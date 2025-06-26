import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); // Adjust storage location as needed

    if (token) {
      // Clone the request and add the Authorization header
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
      return next(clonedReq);
    }

    // Proceed with the original request if no token
  return next(req);
};

