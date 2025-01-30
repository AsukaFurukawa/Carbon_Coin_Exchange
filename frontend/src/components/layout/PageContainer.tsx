import { Box, Container, useColorModeValue } from '@chakra-ui/react';

interface PageContainerProps {
    children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box bg={bgColor} minH="calc(100vh - 64px)">
            <Container
                maxW={{ base: '100%', md: 'container.md', lg: 'container.lg' }}
                py={{ base: 4, md: 8 }}
                px={{ base: 4, md: 6 }}
            >
                {children}
            </Container>
        </Box>
    );
}; 