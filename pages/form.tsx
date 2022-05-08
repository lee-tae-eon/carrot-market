import React from "react";
import { useForm } from "react-hook-form";

// better errors(set, clear, display)
// have control over inputs

interface FormProps {
  email: string;
  password: string;
  username: string;
}

export default function Forms() {
  const { register, handleSubmit } = useForm<FormProps>({});

  const onValid = (data: FormProps) => {};

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {
          required: "this fields is required",
        })}
        type="text"
        placeholder="username"
      />
      <input
        {...register("email", {
          required: "required email",
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: "required password",
        })}
        type="password"
        placeholder="Password"
      />
      <button className="w-32 h-16 text-center" type="submit">
        Create Account
      </button>
    </form>
  );
}
