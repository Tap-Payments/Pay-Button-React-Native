import type { Config } from 'pay-button-react-native';

export type RootStackParamList = {
  ConfigScreen: { config: Config; setConfig: (config: Config) => void };
  HomeScreen: undefined;
};
