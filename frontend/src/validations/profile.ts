import { z } from 'zod';

export const profileUpdateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
    currentPassword: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
    confirmNewPassword: z.string().optional(),
}).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    if (data.newPassword !== data.confirmNewPassword) {
        return false;
    }
    return true;
}, {
    message: "New passwords don't match or current password is required",
    path: ['newPassword'],
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>; 