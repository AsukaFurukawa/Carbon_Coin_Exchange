import {
    Box,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    useColorModeValue,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { rewards } from '../../lib/api';
import { IRedemption } from '../../types/marketplace';

const RedemptionCard = ({ redemption }: { redemption: IRedemption }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('white', 'gray.700');

    return (
        <>
            <Box p={5} shadow="md" borderWidth="1px" bg={bgColor} borderRadius="lg">
                <VStack align="start" spacing={2}>
                    <Heading size="sm">{redemption.reward.title}</Heading>
                    <Text fontSize="sm" color="gray.500">
                        {redemption.reward.merchant.name}
                    </Text>
                    <Text fontSize="sm">
                        Redeemed: {format(new Date(redemption.redeemedAt), 'PPp')}
                    </Text>
                    <Text fontSize="sm">Cost: {redemption.coinsSpent} Carbon Coins</Text>
                    <Button
                        size="sm"
                        colorScheme="green"
                        onClick={onOpen}
                        isDisabled={redemption.isUsed}
                    >
                        {redemption.isUsed ? 'Used' : 'Show Code'}
                    </Button>
                </VStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Redemption Code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4} align="center">
                            <QRCodeSVG
                                value={redemption.redemptionCode}
                                size={200}
                                level="H"
                                includeMargin
                            />
                            <Text fontSize="xl" fontWeight="bold">
                                {redemption.redemptionCode}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                Show this code to the merchant to claim your reward
                            </Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export const RedemptionHistory = () => {
    const { data: redemptions, isLoading } = useQuery(
        ['redemptions'],
        rewards.getRedemptions
    );

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Box>
            <Heading size="md" mb={6}>
                Your Redemptions
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {redemptions?.map((redemption) => (
                    <RedemptionCard key={redemption.id} redemption={redemption} />
                ))}
            </SimpleGrid>
        </Box>
    );
}; 