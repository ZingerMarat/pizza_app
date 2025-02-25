import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ onClose, className }) => {
  const form = useForm<TFormLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formLoginSchema),
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error("LogIn error");
      }

      onClose?.();
      toast.success("LogIn success", {
        icon: "🚀",
      });
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("LogIn error", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="SignIn" size="md" className="font-bold" />
            <p className="text-gray-400">Please enter your email for sign in</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="Email" type="email" placeholder="Enter your email" required />
        <FormInput name="password" label="Password" type="password" placeholder="Enter your password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          LogIn
        </Button>
      </form>
    </FormProvider>
  );
};
