import {
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../../lib/api.jsx';

const COLORS = ['#319795', '#38B2AC', '#4FD1C5', '#81E6D9', '#B2F5EA'];

export const ActivityCharts = () => {
  const { data: stats } = useQuery({
    queryKey: ['activityStats'],
    queryFn: activities.getStats
  });
  
  const { data: activityList } = useQuery({
    queryKey: ['activities'],
    queryFn: activities.getAll
  });
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  // Activity type distribution
  const activityTypeData = activityList?.reduce((acc, activity) => {
    acc[activity.activityType] = (acc[activity.activityType] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(activityTypeData || {}).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value,
  }));

  // Weekly activity trend
  const weeklyData = activityList?.reduce((acc, activity) => {
    const date = new Date(activity.timestamp);
    const week = `Week ${Math.ceil((date.getDate()) / 7)}`;
    acc[week] = (acc[week] || 0) + 1;
    return acc;
  }, {});

  const lineData = Object.entries(weeklyData || {}).map(([name, count]) => ({
    name,
    activities: count,
  }));

  // Coins earned by activity type
  const coinData = activityList?.reduce((acc, activity) => {
    if (activity.verificationStatus === 'APPROVED') {
      acc[activity.activityType] = (acc[activity.activityType] || 0) + 10; // Mock coin calculation
    }
    return acc;
  }, {});

  const barData = Object.entries(coinData || {}).map(([type, coins]) => ({
    type: type.replace('_', ' '),
    coins,
  }));

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Heading size="md" mb={4}>Activity Distribution</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#319795"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box p={6} bg={bgColor} rounded="lg" shadow="sm">
        <Heading size="md" mb={4}>Weekly Activity Trend</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="activities"
              stroke="#319795"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box p={6} bg={bgColor} rounded="lg" shadow="sm" gridColumn={{ lg: 'span 2' }}>
        <Heading size="md" mb={4}>Coins Earned by Activity</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Bar dataKey="coins" fill="#319795" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </SimpleGrid>
  );
}; 