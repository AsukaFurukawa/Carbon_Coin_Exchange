import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activities } from '../../lib/api.jsx';

export const ActivityUpload = ({ activityType }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => activities.uploadProof(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
      toast({
        title: 'Proof uploaded successfully',
        status: 'success',
        duration: 3000,
      });
      setFile(null);
      setPreview(null);
    },
    onError: () => {
      toast({
        title: 'Failed to upload proof',
        status: 'error',
        duration: 3000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('proof', file);
    formData.append('activityType', activityType);
    mutate(formData);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Upload Proof</FormLabel>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
            />
            <Button
              as="label"
              htmlFor="file-upload"
              cursor="pointer"
              colorScheme="gray"
              width="full"
            >
              Choose File
            </Button>
          </FormControl>

          {preview && (
            <Box>
              <Image
                src={preview}
                alt="Preview"
                maxH="200px"
                objectFit="contain"
                borderRadius="md"
              />
            </Box>
          )}

          {file && (
            <Text fontSize="sm" color="gray.500">
              Selected file: {file.name}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="brand"
            isLoading={isLoading}
            isDisabled={!file}
            width="full"
          >
            Upload Proof
          </Button>
        </VStack>
      </form>
    </Box>
  );
}; 