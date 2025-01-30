import {
    VStack,
    Heading,
    Box,
    Text,
    Button,
    useToast,
    HStack,
    Icon,
    useClipboard,
    Skeleton,
} from '@chakra-ui/react';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';

interface WalletStats {
    balance: number;
    totalEarned: number;
    totalSpent: number;
    pendingRewards: number;
}

export const WalletInfo = () => {
    const { user } = useAuthStore();
    const toast = useToast();
    const { onCopy } = useClipboard(user?.walletAddress || '');

    const { data: stats, isLoading } = useQuery<WalletStats>(
        ['wallet-stats'],
        async () => {
            const { data } = await api.get('/users/wallet/stats');
            return data;
        }
    );

    const handleCopyAddress = () => {
        onCopy();
        toast({
            title: 'Wallet address copied',
            status: 'success',
            duration: 2000,
        });
    };

    const openBlockExplorer = () => {
        window.open(
            `${import.meta.env.VITE_BLOCKCHAIN_EXPLORER}/address/${user?.walletAddress}`,
            '_blank'
        );
    };

    return (
        <VStack spacing={6} align="stretch" w="100%" maxW="500px">
            <Heading size="md">Wallet Information</Heading>

            <Box p={4} borderWidth="1px" borderRadius="md">
                <VStack align="stretch" spacing={4}>
                    <Box>
                        <Text fontWeight="bold">Wallet Address</Text>
                        <HStack spacing={2}>
                            <Text fontSize="sm" fontFamily="monospace">
                                {user?.walletAddress}
                            </Text>
                            <Button size="sm" variant="ghost" onClick={handleCopyAddress}>
                                <Icon as={FiCopy} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={openBlockExplorer}>
                                <Icon as={FiExternalLink} />
                            </Button>
                        </HStack>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">Current Balance</Text>
                        <Skeleton isLoaded={!isLoading}>
                            <Text fontSize="2xl">{stats?.balance || 0} CC</Text>
                        </Skeleton>
                    </Box>

                    <VStack spacing={2}>
                        <HStack justify="space-between" w="100%">
                            <Text color="gray.500">Total Earned</Text>
                            <Skeleton isLoaded={!isLoading}>
                                <Text>{stats?.totalEarned || 0} CC</Text>
                            </Skeleton>
                        </HStack>

                        <HStack justify="space-between" w="100%">
                            <Text color="gray.500">Total Spent</Text>
                            <Skeleton isLoaded={!isLoading}>
                                <Text>{stats?.totalSpent || 0} CC</Text>
                            </Skeleton>
                        </HStack>

                        <HStack justify="space-between" w="100%">
                            <Text color="gray.500">Pending Rewards</Text>
                            <Skeleton isLoaded={!isLoading}>
                                <Text>{stats?.pendingRewards || 0} CC</Text>
                            </Skeleton>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>

            <Box>
                <Text fontSize="sm" color="gray.500">
                    Your Carbon Coins (CC) are stored securely on the blockchain. 
                    You can earn more coins by completing eco-friendly activities 
                    and spend them on rewards from our marketplace.
                </Text>
            </Box>
        </VStack>
    );
}; 