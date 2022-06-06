import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";

interface WriteFormProps {
  question: string;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<WriteFormProps>();
  const [post, { loading, data }] = useMutation("/api/posts");
  const onValid = (data: WriteFormProps) => {
    if (loading) return;
    post(data);
  };

  useEffect(() => {}, [data]);
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
