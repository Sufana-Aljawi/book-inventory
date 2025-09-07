// // not-auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotAuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate() {
//     return this.authService.isLoggedIn().pipe(
//       map(isLoggedIn => {
//         if (isLoggedIn) {
//           this.router.navigate(['/']); // redirect logged-in users
//           return false;
//         }
//         return true; // allow if not logged in
//       })
//     );
//   }
// }
