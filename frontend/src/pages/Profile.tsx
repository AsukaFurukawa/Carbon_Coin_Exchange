import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Container,
    Heading,
    VStack,
} from '@chakra-ui/react';
import { ProfileForm } from '../components/profile/ProfileForm';
import { NotificationSettings } from '../components/profile/NotificationSettings';
import { PrivacySettings } from '../components/profile/PrivacySettings';
import { WalletInfo } from '../components/profile/WalletInfo';
import { IntegrationsList } from '../components/integrations/IntegrationsList';

export const Profile = () => {
    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={8} align="stretch">
                <Heading>Account Settings</Heading>

                <Tabs isLazy>
                    <TabList>
                        <Tab>Profile</Tab>
                        <Tab>Notifications</Tab>
                        <Tab>Privacy</Tab>
                        <Tab>Wallet</Tab>
                        <Tab>Integrations</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ProfileForm />
                        </TabPanel>
                        <TabPanel>
                            <NotificationSettings />
                        </TabPanel>
                        <TabPanel>
                            <PrivacySettings />
                        </TabPanel>
                        <TabPanel>
                            <WalletInfo />
                        </TabPanel>
                        <TabPanel>
                            <IntegrationsList />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Container>
    );
}; 