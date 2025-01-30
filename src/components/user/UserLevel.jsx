import {
  Box,
  Progress,
  Text,
  VStack,
  HStack,
  Badge,
  Tooltip,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../../lib/api.jsx';
import {
  ACTIVITY_LEVELS,
  getCurrentLevel,
  getProgressToNextLevel,
} from '../../utils/activityLevels';
import { useStatsStore } from '../../stores/statsStore';

export const UserLevel = () => {
  const totalPoints = useStatsStore((state) => state.totalPoints);

  const currentLevelKey = getCurrentLevel(totalPoints);
  const currentLevel = ACTIVITY_LEVELS[currentLevelKey];
  const progress = getProgressToNextLevel(totalPoints);
  const nextLevelKey = Object.keys(ACTIVITY_LEVELS)[
    Object.keys(ACTIVITY_LEVELS).indexOf(currentLevelKey) + 1
  ];
  const nextLevel = ACTIVITY_LEVELS[nextLevelKey];

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold">Level Progress</Text>
          <Badge colorScheme="brand" fontSize="md">
            {currentLevel.name}
          </Badge>
        </HStack>

        <Tooltip
          label={`${totalPoints} / ${currentLevel.maxPoints} points`}
          hasArrow
        >
          <Progress
            value={progress}
            colorScheme="brand"
            height="8px"
            borderRadius="full"
          />
        </Tooltip>

        <HStack justify="space-between" fontSize="sm" color="gray.500">
          <Text>{totalPoints} points</Text>
          {nextLevel && (
            <Text>Next: {nextLevel.name} ({currentLevel.maxPoints + 1} pts)</Text>
          )}
        </HStack>

        <Text fontSize="sm" color="gray.500">
          Current Rewards:
          <Text as="span" color="brand.500" ml={1}>
            {currentLevel.rewards.coinsPerActivity} CC per activity
          </Text>
        </Text>
      </VStack>
    </Box>
  );
}; 