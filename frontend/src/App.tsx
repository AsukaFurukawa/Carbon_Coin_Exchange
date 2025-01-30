import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ActivityForm } from './components/activities/ActivityForm';
import { RewardsList } from './components/marketplace/RewardsList';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { Profile } from './pages/Profile';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageContainer } from './components/layout/PageContainer';
import { theme } from './theme';

const queryClient = new QueryClient();

function App() {
    return (
        <ErrorBoundary>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <Navbar />
                        <PageContainer>
                            <Routes>
                                <Route path="/login" element={<LoginForm />} />
                                <Route path="/register" element={<RegisterForm />} />
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/activities"
                                    element={
                                        <ProtectedRoute>
                                            <ActivityForm />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/marketplace"
                                    element={
                                        <ProtectedRoute>
                                            <RewardsList />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/merchant"
                                    element={
                                        <ProtectedRoute>
                                            <MerchantDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </PageContainer>
                    </Router>
                </QueryClientProvider>
            </ChakraProvider>
        </ErrorBoundary>
    );
}

export default App; 