import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { FaTrophy, FaMedal, FaCalendarCheck } from 'react-icons/fa';

const getAchievementIcon = (type) => {
  switch (type) {
    case 'MILESTONE':
      return FaTrophy;
    case 'STREAK':
      return FaCalendarCheck;
    default:
      return FaMedal;
  }
};

export const AchievementCard = ({ achievement }) => {
  const AchievementIcon = getAchievementIcon(achievement.type);
  
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={achievement.earned ? 'white' : 'gray.50'}
      opacity={achievement.earned ? 1 : 0.7}
      transition="all 0.2s"
      _hover={{ shadow: 'md' }}
    >
      <HStack spacing={4}>
        <Icon
          as={AchievementIcon}
          boxSize={8}
          color={achievement.earned ? 'brand.500' : 'gray.400'}
        />
        <VStack align="start" spacing={1} flex={1}>
          <HStack justify="space-between" width="100%">
            <Text fontWeight="bold">{achievement.name}</Text>
            {achievement.earned && (
              <Tooltip label={`Earned on ${achievement.date}`}>
                <Badge colorScheme="brand">Earned</Badge>
              </Tooltip>
            )}
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {achievement.description}
          </Text>
          {achievement.progress && (
            <Text fontSize="xs" color="gray.500">
              Progress: {achievement.progress.current} / {achievement.progress.required}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
}; 