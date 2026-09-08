import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flavourfind.app',
  appName: 'Flavour Find',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
