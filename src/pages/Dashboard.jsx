import { Box, Heading } from '@chakra-ui/react';
import { useAuthStore } from '../stores/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box p={8}>
      <Heading>Welcome, {user?.name}</Heading>
    </Box>
  );
}; 