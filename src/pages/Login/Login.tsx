import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import {  useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";
import { loginApi } from "./login.api";
import { loginSchema, type LoginSchema } from "./login.validation";
import { useContext } from "react";
import { tokenContext } from "../context/AuthTokenContext";





export default function Login() {
const navigate = useNavigate();

  const { register, handleSubmit  , formState:{errors , isSubmitting } , reset} = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    
    },
    mode:"all",
    resolver:zodResolver(loginSchema)
  });

const context = useContext(tokenContext);
if (!context) {
  throw new Error("useContext(tokenContext) must be used within AuthTokenContext");
}
const { setData } = context;

  async function handleSubmitInput(userdata: LoginSchema) {
await toast.promise(loginApi(userdata),{
loading:"Creating your account...",
success :function(x){
  console.log("LOGIN RESPONSE:", x);

  localStorage.setItem("userToken", x.data.token);
  setData(x.data.user);

  navigate("/posts");
  reset();

  return <h1 className="text-green-400 capitalize">{x.message}</h1>;
},
error: function(x){
  return <h1 className="text-red-400 capitalize">{x.message}</h1>
}
})
  }
  return (
    <>
      <Form
        className="flex md:min-w-2xl p-10 rounded-3xl shadow-2xl flex-col gap-4 mt-120 md:mt-96 lg:mt-56"
        onSubmit={handleSubmit(handleSubmitInput)}
      >
        <h1 className="text-5xl font-bold text-center">Login</h1>

 
        <TextField isRequired isInvalid={!!errors.email} type="email">
          <Label>Email</Label>
          <Input
            {...register("email"

              
            )}
            placeholder="Enter your email"
            className="focus:ring-orange-400"
          />
        </TextField>

  {errors.email && 
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      }
        <TextField isRequired isInvalid={!!errors.password} type="password">
          <Label>Password</Label>
          <Input
            {...register("password" 
            )}
            placeholder="Enter your password"
  className={` ${!errors.password && "focus:ring-orange-400"}`}          />
        </TextField>
  {errors.password && 
        <span className="text-red-500  text-xs">{errors.password.message}</span>
      }
  
        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-orange-300 hover:bg-orange-400 transition-all duration-300"
            type="submit"
            isPending={isSubmitting}
          >
            {isSubmitting ? <><Spinner className="text-white" size="md" /></>  :<><Check /> Login</>}
          
          </Button>

        </div>
      </Form>
    </>
  );
}
