import {z} from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }),
    address: z.string().min(2, { message: 'Invalid address' }),
    comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;