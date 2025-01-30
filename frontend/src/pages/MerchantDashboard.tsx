import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { RedemptionValidator } from '../components/marketplace/RedemptionValidator';
import { useAuthStore } from '../stores/authStore';

export const MerchantDashboard = () => {
    const { user } = useAuthStore();

    return (
        <VStack spacing={8} align="stretch">
            <Box>
                <Heading>Merchant Dashboard</Heading>
                <Text color="gray.500">{user?.name}</Text>
            </Box>
            
            <Box>
                <Heading size="md" mb={4}>Validate Redemptions</Heading>
                <RedemptionValidator />
            </Box>
        </VStack>
    );
}; 