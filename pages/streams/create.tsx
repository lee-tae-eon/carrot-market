import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}
interface CreateForm {
  name: string;
  price: string;
  description: string;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { data, loading }] =
    useMutation<CreateResponse>(`/api/streams`);

  const { handleSubmit, register } = useForm<CreateForm>();

  const onValid = (formData: CreateForm) => {
    if (loading) return;
    createStream(formData);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-4 ">
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          // placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? "Loading..." : "Go Live"} />
      </form>
    </Layout>
  );
};

export default Create;
