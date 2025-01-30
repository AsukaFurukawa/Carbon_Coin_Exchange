import { Box, Container, VStack, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { ActivityForm } from '../components/activities/ActivityForm';
import { ActivityHistory } from '../components/activities/ActivityHistory';
import { ActivityStats } from '../components/dashboard/ActivityStats';
import { ActivityCharts } from '../components/dashboard/ActivityCharts';
import { UserLevel } from '../components/user/UserLevel';
import { DailyChallenge } from '../components/challenges/DailyChallenge';
import { useAuthStore } from '../stores/authStore';
import { AchievementCard } from '../components/achievements/AchievementCard';
import { useQuery } from '@tanstack/react-query';
import { activities } from '../lib/api.jsx';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['activityStats'],
    queryFn: activities.getStats
  });

  if (statsLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Welcome, {user?.name}</Heading>
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <VStack spacing={8} align="stretch">
            <ActivityStats />
            <UserLevel />
            <DailyChallenge />
          </VStack>
          <ActivityCharts />
        </SimpleGrid>

        <Tabs>
          <TabList>
            <Tab>Submit Activity</Tab>
            <Tab>Activity History</Tab>
            <Tab>Achievements</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActivityForm />
            </TabPanel>
            <TabPanel>
              <ActivityHistory />
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {stats?.achievements?.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
}; 