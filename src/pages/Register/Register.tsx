import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerSchema, type RegisterSchema } from "./Register.validation";
import { registerApi } from "./Register.Api";
import { useNavigate } from "react-router";





export default function Register() {
const navigate = useNavigate();

  const { register, handleSubmit ,control , formState:{errors , isSubmitting } , reset} = useForm<RegisterSchema>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth:"",
      gender: "" as "male" | "female",
      password: "",
      rePassword: "",
    },
    mode:"all",
    resolver:zodResolver(registerSchema)
  });

  async function handleSubmitInput(userdata: RegisterSchema) {
await toast.promise(registerApi(userdata),{
loading:"Creating your account...",
success :function(x){
  navigate("/login");
  reset();
  return <h1 className="text-green-400 capitalize">{x}</h1>
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
        <h1 className="text-5xl font-bold text-center">Register</h1>

        <TextField isRequired type="text " isInvalid={!!errors.name}>
          <Label>Name</Label>
          <Input
            {...register("name"
        
            )}
            placeholder="Enter your name"
            className="focus:ring-orange-400"
          />
        </TextField>
          {errors.name && 
        <span className="text-red-500 text-xs">{errors.name.message}</span>
      }
        <TextField isRequired isInvalid={!!errors.username} type="text">
          <Label>Username</Label>
          <Input
            {...register("username") }
            placeholder="Enter your username"
            className="focus:ring-orange-400"
          />
        </TextField>
  {errors.username && 
        <span className="text-red-500 text-xs">{errors.username.message}</span>
      }
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

        <TextField isRequired  isInvalid={!!errors.dateOfBirth} type="date">
          <Label>Date of Birth</Label>
          <Input
            {...register("dateOfBirth")}
            placeholder="Enter your date of birth"
            className="focus:ring-orange-400 mb-0"
          />
        </TextField>
      {errors.dateOfBirth && 
        <span className="text-red-500 text-xs">{errors.dateOfBirth.message}</span>
      }
<Controller name="gender" control={control}  render={function({field , fieldState}){
  return (
<Select placeholder="Select one" {...field} isInvalid={!!fieldState.error}>
          <Label>Gender</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="male" textValue="Male">
                Male
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="female" textValue="Female">
                Female
                <ListBox.ItemIndicator />
      
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
                      {fieldState.error && 
        <span className="text-red-500 text-xs">{fieldState.error.message}</span>
      }
        </Select>
        
  )
  
}

}></Controller>
   

      

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
        <TextField isRequired isInvalid={!!errors.rePassword} type="password">
          <Label>Confirm Password</Label>
          <Input
            {...register("rePassword")}
            placeholder="Confirm your password"
            className={` ${!errors.rePassword && "focus:ring-orange-400"}`}
          />
        </TextField>
  {errors.rePassword && 
        <span className="text-red-500 text-xs">{errors.rePassword.message}</span>
      }
        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-orange-300 hover:bg-orange-400 transition-all duration-300"
            type="submit"
            isPending={isSubmitting}
          >
            {isSubmitting ? <><Spinner className="text-white" size="md" /></>  :<><Check /> Submit</>}
          
          </Button>
          
          <Button type="reset" className="w-full" variant="danger-soft">
            Reset
          </Button>
        </div>
      </Form>
    </>
  );
}
