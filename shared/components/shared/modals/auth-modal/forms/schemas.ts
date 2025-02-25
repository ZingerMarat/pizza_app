import {z} from 'zod';

export const passwordSchema = z.string().min(4, {message: 'Password must be at least 4 characters long'});

export const formLoginSchema = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema.merge(z.object({
    fullName: z.string().min(2, {message: 'Full name must be at least 2 characters long'}),
    confirmPassword: passwordSchema,
})).refine(data => data.password === data.confirmPassword, {message: 'Passwords do not match', path: ['confirmPassword']});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;