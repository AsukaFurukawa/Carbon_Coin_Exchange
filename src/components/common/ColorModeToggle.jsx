import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

export const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FiMoon, FiSun);

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={<SwitchIcon />}
      variant="ghost"
      onClick={toggleColorMode}
    />
  );
}; 