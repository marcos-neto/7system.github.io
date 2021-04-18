import { RouteInfo } from "app/backend/Models";

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuConfig {
    constructor() {
    }

    public default: RouteInfo[] = [
        {
            path: '/dashboard',
            title: 'Dashboard',
            type: 'link',
            icontype: 'dashboard'
        },
        {
            path: '/ranking',
            title: 'Ranking',
            type: 'link',
            icontype: 'emoji_events'
        },
        {
            path: '/bank',
            title: 'Banco',
            icontype: 'account_balance',
            type: 'link'
        },
        {
            path: '/users',
            title: 'Usuários',
            icontype: 'people',
            type: 'link'
        },
        {
            path: '/clubs',
            title: 'Clubes',
            icontype: 'sports_kabaddi',
            type: 'link'
        },
        {
            path: '',
            title: 'Calendário',
            type: 'sub',
            icontype: 'event_note',
            collapse: 'schedule',
            children: [
                { path: '/schedule', title: 'Calendário do Clube' },
                { path: '/scheduling', title: 'Criar Evento' },
            ]
        }
    ];

    public get menu(): any {
        return this.default;
    }
}