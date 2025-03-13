import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, formRegisterSchema, TFormLoginValues, TFormRegisterValues } from "./schemas";
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

export const RegisterForm: React.FC<Props> = ({ onClose, className }) => {
  const form = useForm<TFormRegisterValues>({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formRegisterSchema),
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error("Register error");
      }

      onClose?.();

      toast.success("Register success", {
        icon: "🚀",
      });
    } catch (error) {
      console.error("Error [Register]", error);
      toast.error("Register error", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="fullName" label="Full Name" type="text" placeholder="Enter your full name" required />
        <FormInput name="email" label="Email" type="email" placeholder="Enter your email" required />
        <FormInput name="password" label="Password" type="password" placeholder="Enter your password" required />
        <FormInput name="confirmPassword" label="Confirm Password" type="password" placeholder="Confirm your password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
