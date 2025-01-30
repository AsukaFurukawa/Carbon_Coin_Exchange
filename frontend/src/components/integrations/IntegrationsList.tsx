import {
    VStack,
    SimpleGrid,
    Button,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Select,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IntegrationCard } from './IntegrationCard';
import { integrationService } from '../../services/integrationService';
import { IntegrationType, FitnessProvider, UtilityProvider } from '../../types/integrations';

export const IntegrationsList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedType, setSelectedType] = useState<IntegrationType>(IntegrationType.FITNESS_TRACKER);
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const queryClient = useQueryClient();

    const { data: integrations, isLoading } = useQuery(
        ['integrations'],
        integrationService.getIntegrations
    );

    const { mutate: connect } = useMutation(
        () => integrationService.connectProvider(selectedType, selectedProvider),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['integrations']);
                onClose();
            },
        }
    );

    const getProviderOptions = () => {
        switch (selectedType) {
            case IntegrationType.FITNESS_TRACKER:
                return Object.values(FitnessProvider);
            case IntegrationType.UTILITY_PROVIDER:
                return Object.values(UtilityProvider);
            default:
                return [];
        }
    };

    return (
        <>
            <VStack spacing={4} align="stretch">
                <Button onClick={onOpen}>Connect New Integration</Button>

                {isLoading ? (
                    <Text>Loading integrations...</Text>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {integrations?.map((integration) => (
                            <IntegrationCard
                                key={integration.id}
                                integration={integration}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Connect New Integration</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Integration Type</FormLabel>
                                <Select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value as IntegrationType)}
                                >
                                    {Object.values(IntegrationType).map((type) => (
                                        <option key={type} value={type}>
                                            {type.replace('_', ' ')}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Provider</FormLabel>
                                <Select
                                    value={selectedProvider}
                                    onChange={(e) => setSelectedProvider(e.target.value)}
                                >
                                    <option value="">Select a provider</option>
                                    {getProviderOptions().map((provider) => (
                                        <option key={provider} value={provider}>
                                            {provider.replace('_', ' ')}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                colorScheme="green"
                                onClick={() => connect()}
                                isDisabled={!selectedProvider}
                                w="100%"
                            >
                                Connect
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}; 