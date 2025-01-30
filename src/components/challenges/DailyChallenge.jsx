import {
  Box,
  VStack,
  HStack,
  Text,
  Progress,
  Icon,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { challenges } from '../../lib/api.jsx';

export const DailyChallenge = () => {
  const { data: dailyChallenges } = useQuery({
    queryKey: ['dailyChallenges'],
    queryFn: challenges.getDaily
  });

  if (!dailyChallenges) return null;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold">Daily Challenges</Text>
          <Badge colorScheme="purple">
            {dailyChallenges.filter(c => c.completed).length} / {dailyChallenges.length}
          </Badge>
        </HStack>

        {dailyChallenges.map((challenge) => (
          <Box
            key={challenge.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg={challenge.completed ? 'green.50' : 'white'}
          >
            <VStack align="stretch" spacing={2}>
              <HStack justify="space-between">
                <Text fontWeight="medium">{challenge.name}</Text>
                <HStack>
                  <Icon as={FaCoins} color="yellow.500" />
                  <Text color="gray.600">{challenge.reward} CC</Text>
                </HStack>
              </HStack>

              <Text fontSize="sm" color="gray.600">
                {challenge.description}
              </Text>

              <Progress
                value={(challenge.progress.current / challenge.progress.required) * 100}
                colorScheme={challenge.completed ? 'green' : 'brand'}
                size="sm"
                borderRadius="full"
              />

              <HStack justify="space-between" fontSize="sm">
                <Text color="gray.500">
                  {challenge.progress.current} / {challenge.progress.required} {challenge.unit}
                </Text>
                {challenge.completed ? (
                  <Badge colorScheme="green">Completed</Badge>
                ) : (
                  <Button size="sm" colorScheme="brand" isDisabled>
                    In Progress
                  </Button>
                )}
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}; 