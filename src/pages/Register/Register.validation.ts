import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod.string().min(3).max(20),
  username: zod.string().min(3).max(20),
  email: zod.email(),
  dateOfBirth: zod.string().refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - new Date(date).getFullYear();
    return age >= 15;
  }, "You must be at least 15 years old to register." ),
  gender: zod.enum(["male", "female"]),
  password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,"Password must be at least 8 characters long, one lowercase letter, one uppercase letter,digit, special character."),
  rePassword: zod.string()
}).refine(function({password , rePassword}){
if(rePassword === password){
return true;
}
}, {
  error:"Passwords do not match",
  path:["rePassword"]
});
export type RegisterSchema = zod.infer<typeof registerSchema>;
