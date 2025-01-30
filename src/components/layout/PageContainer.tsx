import { Box, Container, useColorModeValue } from '@chakra-ui/react';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bgColor} minH="calc(100vh - 64px)">
      <Container maxW="container.lg" py={8}>
        {children}
      </Container>
    </Box>
  );
}; 