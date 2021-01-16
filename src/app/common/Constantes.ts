import { RouteInfo } from "app/backend/Models";
import { ngxLoadingAnimationTypes } from "ngx-loading";

export const Menu: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', isVisible: true },
    { path: '/ranking', title: 'Ranking', icon: 'emoji_events', class: '', isVisible: true },
    { path: '/bank', title: 'Banco', icon: 'account_balance', class: '', isVisible: true },
    { path: '/users', title: 'Usuários', icon: 'people', class: '', isVisible: true },
    { path: '/clubs', title: 'Clubes', icon: 'sports_kabaddi', class: '', isVisible: true },
    { path: '/profile', title: 'Perfil de usuário', icon: 'person', class: 'active-pro', isVisible: true },
    { path: '/user', title: 'Cadastro de usuários', icon: '', class: '', isVisible: false }
];

export const LoadingConfig = {
    animationType: ngxLoadingAnimationTypes.wanderingCubes,
    primaryColour: '#080758',
    secondaryColour: '#F33527',
    backdropBorderRadius: '3px'
};