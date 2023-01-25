import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'az.flegri.rahatget',
  appName: 'RahatGet',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['alert', 'badge', 'sound'],
    },
  }
};

export default config;
