import {
    VStack,
    Heading,
    Switch,
    FormControl,
    FormLabel,
    Text,
    useToast,
    Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';
import { IUserProfile } from '../../types/user';

export const PrivacySettings = () => {
    const { user } = useAuthStore();
    const toast = useToast();
    const [settings, setSettings] = useState<IUserProfile['privacySettings']>(
        user?.privacySettings || {
            showActivityHistory: true,
            showRewards: true,
            publicProfile: false,
        }
    );

    const handleToggle = async (key: keyof IUserProfile['privacySettings']) => {
        try {
            const newSettings = {
                ...settings,
                [key]: !settings[key],
            };

            await api.patch('/users/privacy', { settings: newSettings });
            setSettings(newSettings);
            
            toast({
                title: 'Privacy settings updated',
                status: 'success',
                duration: 2000,
            });
        } catch (error) {
            toast({
                title: 'Update failed',
                status: 'error',
                duration: 2000,
            });
        }
    };

    return (
        <VStack spacing={6} align="stretch" w="100%" maxW="500px">
            <Heading size="md">Privacy Settings</Heading>

            <FormControl display="flex" flexDir="column" gap={2}>
                <FormLabel mb="0">Public Profile</FormLabel>
                <Text fontSize="sm" color="gray.500">
                    Allow others to view your profile and achievements
                </Text>
                <Switch
                    isChecked={settings.publicProfile}
                    onChange={() => handleToggle('publicProfile')}
                />
            </FormControl>

            <Divider />

            <FormControl display="flex" flexDir="column" gap={2}>
                <FormLabel mb="0">Activity History</FormLabel>
                <Text fontSize="sm" color="gray.500">
                    Show your activity history on your public profile
                </Text>
                <Switch
                    isChecked={settings.showActivityHistory}
                    onChange={() => handleToggle('showActivityHistory')}
                />
            </FormControl>

            <FormControl display="flex" flexDir="column" gap={2}>
                <FormLabel mb="0">Rewards Visibility</FormLabel>
                <Text fontSize="sm" color="gray.500">
                    Show your earned rewards on your public profile
                </Text>
                <Switch
                    isChecked={settings.showRewards}
                    onChange={() => handleToggle('showRewards')}
                />
            </FormControl>
        </VStack>
    );
}; 