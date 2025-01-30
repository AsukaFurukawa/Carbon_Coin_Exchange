import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../theme';

function render(ui: React.ReactElement, { route = '/' } = {}) {
    window.history.pushState({}, 'Test page', route);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return rtlRender(
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{ui}</BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export * from '@testing-library/react';
export { render }; 