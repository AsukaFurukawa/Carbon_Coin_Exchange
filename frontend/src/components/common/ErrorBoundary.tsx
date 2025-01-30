import React from 'react';
import {
    VStack,
    Heading,
    Text,
    Button,
    Container,
    Icon,
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container maxW="container.md" py={10}>
                    <VStack spacing={6} align="center">
                        <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" />
                        <Heading size="lg">Something went wrong</Heading>
                        <Text color="gray.600" textAlign="center">
                            We apologize for the inconvenience. Please try refreshing the page
                            or contact support if the problem persists.
                        </Text>
                        <Button
                            colorScheme="green"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </Button>
                        {process.env.NODE_ENV === 'development' && (
                            <Text
                                fontSize="sm"
                                color="red.500"
                                fontFamily="monospace"
                                whiteSpace="pre-wrap"
                            >
                                {this.state.error?.toString()}
                            </Text>
                        )}
                    </VStack>
                </Container>
            );
        }

        return this.props.children;
    }
} 