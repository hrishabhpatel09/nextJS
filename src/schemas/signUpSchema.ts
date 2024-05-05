import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 character")
  .max(10, "Username is too long , its Should be less than 10")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email Address'}),
    password: z.string().min(8,{message: 'Password must be atleast of 8 character'})
})
