import { string, z } from "zod";

export const userResolver = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	phoneNumber: z.string()
});

export type UserModel = z.infer<typeof userResolver>;
