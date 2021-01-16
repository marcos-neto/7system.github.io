import { ClubComponent } from './club/club.component';
import { ClubsComponent } from './clubs/clubs.component';
import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { BankComponent } from './bank/bank.component';
import { RankingComponent } from './ranking/ranking.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user', component: UserComponent },
    { path: 'ranking', component: RankingComponent },
    { path: 'bank', component: BankComponent },
    { path: 'clubs', component: ClubsComponent },
    { path: 'club', component: ClubComponent },
];
