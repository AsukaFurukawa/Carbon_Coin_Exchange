import { Box, useColorModeValue } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../../lib/api';
import { ActivityType } from '../../types/activity';

export const ActivityChart = () => {
    const { data: stats } = useQuery(['activityStats'], activities.getStats);
    const bgColor = useColorModeValue('white', 'gray.800');

    const chartData = Object.entries(stats?.activitiesByType || {}).map(([type, count]) => ({
        type,
        count,
    }));

    return (
        <Box p={6} bg={bgColor} rounded="lg" shadow="sm" h="400px">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#48BB78" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}; 