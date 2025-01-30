import { Box, Container, VStack, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ActivityForm } from '../components/activities/ActivityForm';
import { ActivityHistory } from '../components/activities/ActivityHistory';
import { ActivityStats } from '../components/dashboard/ActivityStats';
import { ActivityCharts } from '../components/dashboard/ActivityCharts';
import { useAuthStore } from '../stores/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Welcome, {user?.name}</Heading>
        
        <ActivityStats />
        <ActivityCharts />

        <Tabs>
          <TabList>
            <Tab>Submit Activity</Tab>
            <Tab>Activity History</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActivityForm />
            </TabPanel>
            <TabPanel>
              <ActivityHistory />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
}; 