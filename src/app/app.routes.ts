import { Routes } from '@angular/router';
import { LoggaIn } from './admin/logga-in/logga-in';
import { Layout } from './admin/layout/layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { Messages } from './admin/messages/messages';
import { Menu } from './admin/menu/menu';
import { Orders } from './admin/orders/orders';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin/logga-in',
        pathMatch: 'full'
    },

    {
        path: 'admin/logga-in',
        component: LoggaIn,
        title: 'Admin | Logga in'
    },

    {
        path: 'admin',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                title: 'Admin | Dashboard'
            },
            {
                path: 'meddelanden',
                component: Messages,
                title: 'Admin | Meddelanden'
            },
            {
                path: 'meny',
                component: Menu,
                title: 'Admin | Meny'
            },
            {
                path: 'bestallningar',
                component: Orders,
                title: 'Admin | Beställningar'
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },

    {
        path: '404',
        component: NotFound,
        title: '404'
    },

    {
        path: '**',
        redirectTo: '404'
    }

];