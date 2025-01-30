import {
  Box,
  Image,
  Badge,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { rewards } from '../../lib/api';

export const RewardCard = ({ reward }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { mutate, isLoading } = useMutation({
    mutationFn: rewards.redeem,
    onSuccess: () => {
      queryClient.invalidateQueries(['rewards']);
      queryClient.invalidateQueries(['user']);
      toast({
        title: 'Reward redeemed successfully',
        status: 'success',
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to redeem reward',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
      });
    },
  });

  const handleRedeem = () => {
    mutate(reward.id);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: 'md' }}
    >
      <Image src={reward.image} alt={reward.name} height="200px" objectFit="cover" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="brand">
            {reward.category}
          </Badge>
          <Text
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {reward.merchant}
          </Text>
        </Box>

        <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {reward.name}
        </Text>

        <Text mt="2" color="gray.500" fontSize="sm" noOfLines={2}>
          {reward.description}
        </Text>

        <VStack mt="4" align="stretch">
          <HStack justify="space-between">
            <Text color="brand.500" fontSize="xl" fontWeight="bold">
              {reward.cost} CC
            </Text>
            <Text color="gray.500" fontSize="sm">
              {reward.stock} left
            </Text>
          </HStack>

          <Button
            colorScheme="brand"
            isLoading={isLoading}
            isDisabled={user?.carbonCoins < reward.cost || reward.stock === 0}
            onClick={handleRedeem}
          >
            {user?.carbonCoins < reward.cost
              ? 'Insufficient coins'
              : reward.stock === 0
              ? 'Out of stock'
              : 'Redeem'}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}; 