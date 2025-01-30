import { VStack, Heading, Box } from '@chakra-ui/react';
import { ActivityStats } from '../components/dashboard/ActivityStats';
import { ActivityHistory } from '../components/activities/ActivityHistory';
import { useAuthStore } from '../stores/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <VStack spacing={8} align="stretch">
      <Heading>Welcome, {user?.name}</Heading>
      
      <ActivityStats />

      <Box>
        <Heading size="md" mb={4}>Recent Activities</Heading>
        <ActivityHistory />
      </Box>
    </VStack>
  );
}; 