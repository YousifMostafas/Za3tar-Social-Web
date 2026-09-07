import * as zod from "zod";

export const resetSchema = zod.object({
  password: zod.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters long, one lowercase letter, one uppercase letter, digit, special character."
  ),
  newPassword: zod.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters long, one lowercase letter, one uppercase letter, digit, special character."
  )
})
export type resetSchema = zod.infer<typeof resetSchema>;