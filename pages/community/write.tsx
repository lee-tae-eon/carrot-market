import { useEffect } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import useCoords from "@libs/client/useCoords";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";

interface WriteFormProps {
  question: string;
}

interface WriteResponseType {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteFormProps>();
  const [post, { loading, data }] =
    useMutation<WriteResponseType>("/api/posts");
  const onValid = (data: WriteFormProps) => {
    if (loading) return;
    post(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
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
