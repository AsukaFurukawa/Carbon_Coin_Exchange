import {
    VStack,
    Heading,
    Switch,
    FormControl,
    FormLabel,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';

export const NotificationSettings = () => {
    const { user } = useAuthStore();
    const toast = useToast();
    const [preferences, setPreferences] = useState(user?.notificationPreferences);

    const handleToggle = async (key: string) => {
        try {
            const newPreferences = {
                ...preferences,
                [key]: !preferences[key],
            };

            await api.patch('/users/notifications', { preferences: newPreferences });
            setPreferences(newPreferences);
            
            toast({
                title: 'Preferences updated',
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
            <Heading size="md">Notification Preferences</Heading>

            <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Email Notifications</FormLabel>
                <Switch
                    isChecked={preferences?.email}
                    onChange={() => handleToggle('email')}
                />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Push Notifications</FormLabel>
                <Switch
                    isChecked={preferences?.push}
                    onChange={() => handleToggle('push')}
                />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Activity Reminders</FormLabel>
                <Switch
                    isChecked={preferences?.activityReminders}
                    onChange={() => handleToggle('activityReminders')}
                />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Marketplace Updates</FormLabel>
                <Switch
                    isChecked={preferences?.marketplaceUpdates}
                    onChange={() => handleToggle('marketplaceUpdates')}
                />
            </FormControl>
        </VStack>
    );
}; 