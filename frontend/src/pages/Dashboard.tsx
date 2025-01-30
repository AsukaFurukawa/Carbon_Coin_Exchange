import { VStack, Heading, Box } from '@chakra-ui/react';
import { ActivityStats } from '../components/dashboard/ActivityStats';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { ActivityHistory } from '../components/activities/ActivityHistory';

export const Dashboard = () => {
    return (
        <VStack spacing={8} align="stretch">
            <Heading>Dashboard</Heading>
            <ActivityStats />
            <Box>
                <Heading size="md" mb={4}>Activity Distribution</Heading>
                <ActivityChart />
            </Box>
            <Box>
                <Heading size="md" mb={4}>Recent Activities</Heading>
                <ActivityHistory />
            </Box>
        </VStack>
    );
}; 