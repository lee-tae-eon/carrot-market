import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

const Create: NextPage = () => {
  const { handleSubmit, register } = useForm();
  return (
    <Layout canGoBack title="Go Live">
      <form className="px-4 py-10 space-y-4 ">
        <Input
          register={register("name")}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price")}
          required
          label="Price"
          // placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description")}
          name="description"
          label="Description"
        />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
