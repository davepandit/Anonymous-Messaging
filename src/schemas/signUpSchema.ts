import {z} from 'zod'

export const userSchemaValidation = z.
    string()
    .min(2, 'Username must be of atleast of 2 characters')
    .max(20, 'Username at max can be of 20 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Username must not contain special characters')

export const signUpSchema = z.object({
    username: userSchemaValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6 , {message:'Password must be at least of 6 characters'})
})