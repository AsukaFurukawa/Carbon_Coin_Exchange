import {
  Box,
  VStack,
  HStack,
  Text,
  Progress,
  Icon,
  Button,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { challenges } from '../../lib/api.jsx';
import { useStatsStore } from '../../stores/statsStore';
import { useEffect, useRef } from 'react';

export const DailyChallenge = () => {
  const { data: dailyChallenges } = useQuery({
    queryKey: ['dailyChallenges'],
    queryFn: challenges.getDaily
  });
  const challengeProgress = useStatsStore((state) => state.challengeProgress);
  const completedChallenges = useStatsStore((state) => state.completedChallenges);
  const toast = useToast();
  const previousCompletions = useRef(new Set());

  // Map challenge IDs to activity types
  const challengeToActivityType = {
    '1': 'WALKING',        // Walking Warrior
    '2': 'PUBLIC_TRANSPORT', // Eco Commuter
    '3': 'RECYCLING'       // Recycling Hero
  };

  // Update challenge progress with stored progress
  const updatedChallenges = dailyChallenges?.map(challenge => {
    const activityType = challengeToActivityType[challenge.id];
    const currentProgress = challengeProgress[activityType] || 0;
    const wasCompletedBefore = completedChallenges.includes(challenge.id);
    const isCompletedNow = currentProgress >= challenge.progress.required;

    return {
      ...challenge,
      progress: {
        ...challenge.progress,
        current: currentProgress,
      },
      completed: isCompletedNow,
    };
  });

  // Handle challenge completion toasts
  useEffect(() => {
    if (!updatedChallenges) return;
    
    updatedChallenges.forEach(challenge => {
      const isNewlyCompleted = challenge.completed && 
        !previousCompletions.current.has(challenge.id);
      
      if (isNewlyCompleted) {
        toast({
          title: 'Challenge Completed!',
          description: `You earned ${challenge.reward} CC for completing "${challenge.name}"!`,
          status: 'success',
          duration: 5000,
          position: 'bottom-right',
        });
        previousCompletions.current.add(challenge.id);
      }
    });
  }, [updatedChallenges, toast]);

  if (!updatedChallenges) return null;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold">Daily Challenges</Text>
          <Badge colorScheme="purple">
            {updatedChallenges.filter(c => c.completed).length} / {updatedChallenges.length}
          </Badge>
        </HStack>

        {updatedChallenges.map((challenge) => (
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