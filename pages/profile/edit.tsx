import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";
import useUser from "@libs/client/useUser";

interface EditProfileForm {
  email?: string;
  phone?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<EditProfileForm>();

  return (
    <Layout canGoBack title="Edit Profile">
      <form className="px-4 py-10 space-y-4">
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
          required
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
