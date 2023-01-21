import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path:'home/:stepid',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'transition',
    loadChildren: () => import('./pages/transition/transition.module').then( m => m.TransitionPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'chatrg',
    loadChildren: () => import('./pages/chatrg/chatrg.module').then( m => m.ChatrgPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'myinfo',
    loadChildren: () => import('./pages/myinfo/myinfo.module').then( m => m.MyinfoPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'paymentmethods',
    loadChildren: () => import('./pages/paymentmethods/paymentmethods.module').then( m => m.PaymentmethodsPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'paymentmethods/:stepid',
    loadChildren: () => import('./pages/paymentmethods/paymentmethods.module').then( m => m.PaymentmethodsPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'departures',
    loadChildren: () => import('./pages/departures/departures.module').then( m => m.DeparturesPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'myaddress',
    loadChildren: () => import('./pages/myaddress/myaddress.module').then( m => m.MyaddressPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'promocode',
    loadChildren: () => import('./pages/promocode/promocode.module').then( m => m.PromocodePageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evohome',
    loadChildren: () => import('./pages/evohome/evohome.module').then( m => m.EvohomePageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evohome/:stepid',
    loadChildren: () => import('./pages/evohome/evohome.module').then( m => m.EvohomePageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evomyinfo',
    loadChildren: () => import('./pages/evomyinfo/evomyinfo.module').then( m => m.EvomyinfoPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evodepartures',
    loadChildren: () => import('./pages/evodepartures/evodepartures.module').then( m => m.EvodeparturesPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evonotification',
    loadChildren: () => import('./pages/evonotification/evonotification.module').then( m => m.EvonotificationPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evopaymentmethods',
    loadChildren: () => import('./pages/evopaymentmethods/evopaymentmethods.module').then( m => m.EvopaymentmethodsPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evopromocode',
    loadChildren: () => import('./pages/evopromocode/evopromocode.module').then( m => m.EvopromocodePageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evohelp',
    loadChildren: () => import('./pages/evohelp/evohelp.module').then( m => m.EvohelpPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'evochat',
    loadChildren: () => import('./pages/evochat/evochat.module').then( m => m.EvochatPageModule)
    ,canActivate: [AuthGuardGuard]
  },
  {
    path: 'myreservation',
    loadChildren: () => import('./pages/myreservation/myreservation.module').then( m => m.MyreservationPageModule)
    ,canActivate: [AuthGuardGuard]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
