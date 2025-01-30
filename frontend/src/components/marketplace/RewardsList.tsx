import { useQuery } from '@tanstack/react-query';
import { SimpleGrid, Box, Heading, Text, Spinner, Center } from '@chakra-ui/react';
import { rewards } from '../../lib/api';
import { RewardCard } from './RewardCard';

export const RewardsList = () => {
    const { data, isLoading, error, refetch } = useQuery(['rewards'], rewards.getAvailable);

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" p={4}>
                <Text color="red.500">Error loading rewards</Text>
            </Box>
        );
    }

    return (
        <Box>
            <Heading mb={6}>Available Rewards</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {data?.map((reward) => (
                    <RewardCard
                        key={reward.id}
                        reward={reward}
                        onRedeem={refetch}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}; 