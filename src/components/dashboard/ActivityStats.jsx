import {
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../../lib/api.jsx';

export const ActivityStats = () => {
  const { data: stats } = useQuery({
    queryKey: ['activityStats'],
    queryFn: activities.getStats
  });
  
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Total Activities</StatLabel>
          <StatNumber>{stats?.totalActivities || 0}</StatNumber>
          <StatHelpText>All time</StatHelpText>
        </Stat>
      </Box>

      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Carbon Coins Earned</StatLabel>
          <StatNumber>{stats?.totalCoinsEarned || 0} CC</StatNumber>
          <StatHelpText>Available to spend</StatHelpText>
        </Stat>
      </Box>

      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Stat>
          <StatLabel>Pending Activities</StatLabel>
          <StatNumber>{stats?.verificationStats?.pending || 0}</StatNumber>
          <StatHelpText>Awaiting verification</StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
}; 