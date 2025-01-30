import {
    Box,
    VStack,
    HStack,
    Text,
    Button,
    Icon,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IIntegration } from '../../types/integrations';
import { integrationService } from '../../services/integrationService';
import { format } from 'date-fns';

interface IntegrationCardProps {
    integration: IIntegration;
}

export const IntegrationCard = ({ integration }: IntegrationCardProps) => {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: sync, isLoading: isSyncing } = useMutation(
        () => integrationService.syncData(integration.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['integrations']);
                toast({
                    title: 'Data synced successfully',
                    status: 'success',
                    duration: 3000,
                });
            },
            onError: () => {
                toast({
                    title: 'Failed to sync data',
                    status: 'error',
                    duration: 3000,
                });
            },
        }
    );

    const { mutate: disconnect } = useMutation(
        () => integrationService.disconnectProvider(integration.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['integrations']);
                toast({
                    title: 'Integration disconnected',
                    status: 'success',
                    duration: 3000,
                });
            },
        }
    );

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            position="relative"
        >
            <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                    <Text fontWeight="bold">{integration.provider}</Text>
                    <Icon
                        as={integration.isConnected ? FiCheck : FiX}
                        color={integration.isConnected ? 'green.500' : 'red.500'}
                    />
                </HStack>

                {integration.lastSynced && (
                    <Text fontSize="sm" color="gray.500">
                        Last synced: {format(new Date(integration.lastSynced), 'PPp')}
                    </Text>
                )}

                <HStack spacing={2}>
                    <Button
                        size="sm"
                        leftIcon={<Icon as={FiRefreshCw} />}
                        onClick={() => sync()}
                        isLoading={isSyncing}
                        isDisabled={!integration.isConnected}
                    >
                        Sync
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => disconnect()}
                        isDisabled={!integration.isConnected}
                    >
                        Disconnect
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}; 