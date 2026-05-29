import { Routes } from '@angular/router';
import { LoggaIn } from './admin/logga-in/logga-in';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "admin/logga-in",
        pathMatch: "full"
    },
    {
        path: "admin/logga-in",
        component: LoggaIn,
        title: "Admin | Logga in"
    }

];
