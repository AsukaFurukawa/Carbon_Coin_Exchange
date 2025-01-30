import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#e6f6e6',
    100: '#c2e5c2',
    200: '#9bd39b',
    300: '#74c174',
    400: '#4db04d',
    500: '#339933',
    600: '#287728',
    700: '#1d551d',
    800: '#123312',
    900: '#061106',
  },
};

export const theme = extendTheme({ config, colors }); 