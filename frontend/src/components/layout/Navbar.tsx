import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    Text,
    useDisclosure,
    VStack,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
} from '@chakra-ui/react';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { ColorModeToggle } from '../common/ColorModeToggle';

export const Navbar = () => {
    const { user, logout } = useAuthStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('white', 'gray.800');

    const NavLinks = () => (
        <>
            {user && (
                <>
                    <Button
                        as={RouterLink}
                        to="/activities"
                        variant="ghost"
                    >
                        Activities
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/marketplace"
                        variant="ghost"
                    >
                        Marketplace
                    </Button>
                </>
            )}
        </>
    );

    const MobileNav = () => (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                    <VStack align="stretch" spacing={4}>
                        <NavLinks />
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );

    return (
        <Box bg={bgColor} px={4} shadow="sm" position="sticky" top={0} zIndex={10}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <HStack spacing={8} alignItems="center">
                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onOpen}
                        variant="ghost"
                        aria-label="Open menu"
                        icon={<FiMenu />}
                    />
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        as={RouterLink}
                        to="/"
                    >
                        Carbon Coin
                    </Text>
                    <HStack
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <NavLinks />
                    </HStack>
                </HStack>

                <HStack spacing={4}>
                    <ColorModeToggle />
                    {user ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<FiUser />}
                                variant="ghost"
                            >
                                {user.carbonCoins} CC
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    as={RouterLink}
                                    to="/profile"
                                >
                                    Profile Settings
                                </MenuItem>
                                <MenuItem
                                    icon={<FiLogOut />}
                                    onClick={logout}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <HStack spacing={2}>
                            <Button
                                as={RouterLink}
                                to="/login"
                                variant="ghost"
                            >
                                Login
                            </Button>
                            <Button
                                as={RouterLink}
                                to="/register"
                            >
                                Register
                            </Button>
                        </HStack>
                    )}
                </HStack>
            </Flex>
            <MobileNav />
        </Box>
    );
}; 