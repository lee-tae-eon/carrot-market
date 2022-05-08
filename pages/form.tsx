import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

// better errors(set, clear, display)
// have control over inputs

interface FormTypes {
  email: string;
  password: string;
  username: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    mode: "onChange",
  });

  const onValid = (data: FormTypes) => {
    console.log("iam valid bby");
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors, "errors");
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "user name is required",
          minLength: {
            value: 5,
            message: "username should be longer than 5 chars",
          },
        })}
        type="text"
        placeholder="username"
        className={`${
          Boolean(errors.username?.message) ? "border-red-500" : ""
        } outline-none`}
      />
      <span>{errors.username?.message}</span>
      <input
        {...register("email", {
          required: "email is wrong",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      <span>{errors.email?.message}</span>
      <input
        {...register("password", {
          required: "password is wrong",
        })}
        type="password"
        placeholder="Password"
      />
      <span>{errors.password?.message}</span>
      <button className="w-32 h-16 text-center" type="submit">
        Create Account
      </button>
    </form>
  );
}
