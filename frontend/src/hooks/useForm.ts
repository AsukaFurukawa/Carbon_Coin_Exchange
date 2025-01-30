import { useForm as useHookForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

interface UseFormConfig<T> extends Omit<UseFormProps<T>, 'resolver'> {
    schema: ZodSchema;
}

export function useForm<T>({ schema, ...config }: UseFormConfig<T>) {
    return useHookForm<T>({
        ...config,
        resolver: zodResolver(schema),
    });
} 