import * as zod from "zod";

export const loginSchema = zod.object({

  email: zod.email(),
  password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,"Password must be at least 8 characters long, one lowercase letter, one uppercase letter,digit, special character."),

})

export type LoginSchema = zod.infer<typeof loginSchema>;
