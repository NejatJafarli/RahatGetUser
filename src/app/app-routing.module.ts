import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path:'home/:stepid',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pickup-calls',
    loadChildren: () => import('./pages/pickup-calls/pickup-calls.module').then( m => m.PickupCallsPageModule)
  },
  {
    path: 'transition',
    loadChildren: () => import('./pages/transition/transition.module').then( m => m.TransitionPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'addcar',
    loadChildren: () => import('./pages/addcar/addcar.module').then( m => m.AddcarPageModule)
  },
  {
    path: 'chatrg',
    loadChildren: () => import('./pages/chatrg/chatrg.module').then( m => m.ChatrgPageModule)
  },
  {
    path: 'myinfo',
    loadChildren: () => import('./pages/myinfo/myinfo.module').then( m => m.MyinfoPageModule)
  },
  {
    path: 'paymentmethods',
    loadChildren: () => import('./pages/paymentmethods/paymentmethods.module').then( m => m.PaymentmethodsPageModule)
  },
  {
    path: 'paymentmethods/:stepid',
    loadChildren: () => import('./pages/paymentmethods/paymentmethods.module').then( m => m.PaymentmethodsPageModule)
  },
  {
    path: 'departures',
    loadChildren: () => import('./pages/departures/departures.module').then( m => m.DeparturesPageModule)
  },
  {
    path: 'myaddress',
    loadChildren: () => import('./pages/myaddress/myaddress.module').then( m => m.MyaddressPageModule)
  },
  {
    path: 'promocode',
    loadChildren: () => import('./pages/promocode/promocode.module').then( m => m.PromocodePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'evohome',
    loadChildren: () => import('./pages/evohome/evohome.module').then( m => m.EvohomePageModule)
  },
  {
    path: 'evohome/:stepid',
    loadChildren: () => import('./pages/evohome/evohome.module').then( m => m.EvohomePageModule)
  },
  {
    path: 'evomyinfo',
    loadChildren: () => import('./pages/evomyinfo/evomyinfo.module').then( m => m.EvomyinfoPageModule)
  },
  {
    path: 'evodepartures',
    loadChildren: () => import('./pages/evodepartures/evodepartures.module').then( m => m.EvodeparturesPageModule)
  },
  {
    path: 'evonotification',
    loadChildren: () => import('./pages/evonotification/evonotification.module').then( m => m.EvonotificationPageModule)
  },
  {
    path: 'evopaymentmethods',
    loadChildren: () => import('./pages/evopaymentmethods/evopaymentmethods.module').then( m => m.EvopaymentmethodsPageModule)
  },
  {
    path: 'evopromocode',
    loadChildren: () => import('./pages/evopromocode/evopromocode.module').then( m => m.EvopromocodePageModule)
  },
  {
    path: 'evohelp',
    loadChildren: () => import('./pages/evohelp/evohelp.module').then( m => m.EvohelpPageModule)
  },
  {
    path: 'evochat',
    loadChildren: () => import('./pages/evochat/evochat.module').then( m => m.EvochatPageModule)
  },  {
    path: 'myreservation',
    loadChildren: () => import('./pages/myreservation/myreservation.module').then( m => m.MyreservationPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
