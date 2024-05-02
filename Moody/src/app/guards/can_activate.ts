import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "../services/authentification.service";

export const CanActivate = () => {
    const authservice = inject(AuthentificationService);
    const router = inject(Router);
    return new Observable<boolean>((res) => {
        authservice.isLoggedIn().subscribe((isLoggedIn: boolean) => {
            if (isLoggedIn) {
                res.next(true);
            } else {
                //router.navigate(['/login']);
                console.log("nikomk");
                res.next(false);
                
            }
            res.complete();
        });
    });
}