import { Button, Input, Label, Spinner, TextField } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { resetSchema } from './changepassword.validation';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'iconsax-reactjs';
import { resetApi } from './changepassword.api';

export default function Changepassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<resetSchema>({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    mode: "all",
    resolver: zodResolver(resetSchema)
  });

  async function handleSubmitInput(userdata: resetSchema) {
    await toast.promise(
      resetApi({
        password: userdata.password,
        newPassword: userdata.newPassword, 
      }),
      {
        loading: "Updating password...",
        success: (x) => <h1 className="text-green-400 capitalize">{x}</h1>,
        error: (x) => (
          <h1 className="text-red-400 capitalize">
            {x?.response?.data?.message || x.message}
          </h1>
        ),
      }
    );
  }

  return (
    <form
      className="flex md:min-w-2xl p-10 rounded-3xl shadow-2xl flex-col gap-4 mt-120 md:mt-96 lg:mt-56"
      onSubmit={handleSubmit(handleSubmitInput)}
    >
      <h1 className="text-5xl font-bold text-center">Change Password</h1>

      <TextField isRequired isInvalid={!!errors.password} type="password">
        <Label>Password</Label>
        <Input
          {...register("password")}
          placeholder="Enter your password"
          className={`${!errors.password && "focus:ring-orange-400"}`}
        />
      </TextField>
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}

      <TextField isRequired isInvalid={!!errors.newPassword} type="password">
        <Label>New Password</Label>
        <Input
          {...register("newPassword")}
          placeholder="Confirm your new password"
          className={`${!errors.newPassword && "focus:ring-orange-400"}`}
        />
      </TextField>
      {errors.newPassword && (
        <span className="text-red-500 text-xs">{errors.newPassword.message}</span>
      )}

      <div className="flex flex-col gap-2">
        <Button
          className="w-full bg-orange-300 hover:bg-orange-400 transition-all duration-300"
          type="submit"
          isPending={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner className="text-white" size="md" />
          ) : (
            <><Check /> Change</>
          )}
        </Button>

        <Button type="reset" className="w-full" variant="danger-soft">
          Reset
        </Button>
      </div>
    </form>
  );
}