import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../../lib/api';

export const ActivityStats = () => {
  const { data: stats } = useQuery(['activityStats'], activities.getStats);
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Total Activities</StatLabel>
          <StatNumber>{stats?.totalActivities || 0}</StatNumber>
        </Stat>
      </Box>
      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Coins Earned</StatLabel>
          <StatNumber>{stats?.totalCoinsEarned || 0}</StatNumber>
          <StatHelpText>Carbon Coins</StatHelpText>
        </Stat>
      </Box>
      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Pending Verification</StatLabel>
          <StatNumber>{stats?.verificationStats.pending || 0}</StatNumber>
        </Stat>
      </Box>
      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Approved Activities</StatLabel>
          <StatNumber>{stats?.verificationStats.approved || 0}</StatNumber>
        </Stat>
      </Box>
    </SimpleGrid>
  );
}; 