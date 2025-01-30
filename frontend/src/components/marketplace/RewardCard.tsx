import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Badge,
    useToast,
} from '@chakra-ui/react';
import { IReward } from '../../types/marketplace';
import { rewards } from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';

interface RewardCardProps {
    reward: IReward;
    onRedeem: () => void;
}

export const RewardCard = ({ reward, onRedeem }: RewardCardProps) => {
    const { user } = useAuthStore();
    const toast = useToast();

    const handleRedeem = async () => {
        try {
            if (!user || user.carbonCoins < reward.coinsCost) {
                toast({
                    title: 'Insufficient coins',
                    status: 'error',
                    duration: 3000,
                });
                return;
            }

            await rewards.redeem(reward.id);
            onRedeem();
            toast({
                title: 'Reward redeemed successfully',
                status: 'success',
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: 'Failed to redeem reward',
                status: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            width="100%"
            maxW="300px"
            position="relative"
        >
            <VStack align="start" spacing={3}>
                <Badge colorScheme="green">{reward.merchant.category}</Badge>
                <Heading size="md">{reward.title}</Heading>
                <Text>{reward.description}</Text>
                <Text fontWeight="bold">
                    Cost: {reward.coinsCost} Carbon Coins
                </Text>
                <Text color="green.500">
                    {reward.discountPercent}% Discount
                </Text>
                <Text fontSize="sm">
                    Available: {reward.maxRedemptions - reward.currentRedemptions}
                </Text>
                <Text fontSize="sm">
                    Valid until: {new Date(reward.validUntil).toLocaleDateString()}
                </Text>
                <Button
                    colorScheme="green"
                    width="100%"
                    onClick={handleRedeem}
                    isDisabled={!user || user.carbonCoins < reward.coinsCost}
                >
                    Redeem
                </Button>
            </VStack>
        </Box>
    );
}; 