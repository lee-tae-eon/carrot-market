import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";
import useUser from "@libs/client/useUser";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const [avatarPreview, setAvatarPreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>({});

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  useEffect(() => {
    if (user?.email) setValue("email", user?.email || "");
    if (user?.phone) setValue("phone", user?.phone || "");
    if (user?.name) setValue("name", user?.name || "");
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${user?.avatar}/avatar` ||
          ""
      );
  }, [user, setValue]);

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar, setAvatarPreview]);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;

    if (email === "" && phone === "" && name !== "") {
      return setError("formErrors", {
        message:
          "Email or phone number or name are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
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
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="rounded-full w-14 h-14 bg-slate-500"
            />
          ) : (
            <div className="rounded-full w-14 h-14 bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
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
