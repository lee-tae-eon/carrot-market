import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>({});

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  useEffect(() => {
    setValue("email", user?.email || "");
    setValue("phone", user?.phone || "");
  }, [user, setValue]);

  const onValid = ({ email, phone }: EditProfileForm) => {
    if (loading) return;

    if (email === "" && phone === "") {
      return setError("formErrors", {
        message: "Email or phone number are required. You need to choose one.",
      });
    }

    editProfile({
      email,
      phone,
    });
  };

  useEffect(() => {
    if (data && !data?.ok && data?.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="rounded-full w-14 h-14 bg-slate-500" />
          <label
            htmlFor="picture"
            className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors?.message && (
          <span className="block my-2 font-bold text-red-400">
            {errors.formErrors?.message}
          </span>
        )}
        <Button text={loading ? "loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
