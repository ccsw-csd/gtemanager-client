import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LayoutComponent } from './core/views/layout/layout.component';
import { LoginComponent } from './login/views/login/login.component';
import { EvidenceListComponent } from './evidences/views/evidence-list/evidence-list.component';
import { ErrorListComponent } from './evidences/views/error-list/error-list.component';
import { DashboardMainComponent } from './dashboard/views/dashboard-main/dashboard-main.component';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';
import { BlacklistListComponent } from './blacklist/views/blacklist-list/blacklist-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    resolve: {credentials: RefreshTokenResolverService},
    canActivate: [AuthGuard],
    children: [
      { path: 'main', component: EvidenceListComponent },
      { path: 'errors', component: ErrorListComponent},
      { path: 'dashboard', component: DashboardMainComponent},
      { path: 'blacklist', component: BlacklistListComponent},
      { path: '**', redirectTo: 'main', pathMatch: 'full' },
    ]
  },  
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
