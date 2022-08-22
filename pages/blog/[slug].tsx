import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

interface PostProps {
  post: string;
  data: any;
}

const Post: NextPage<PostProps> = ({ post, data }) => {
  return (
    <Layout title={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post || "" }}
      ></div>
    </Layout>
  );
};

//* getStaticProps 를 사용하는 페이지가 동적 페이지일때 사용하는 getStaticPaths
export function getStaticPaths() {
  const files = readdirSync("./posts/blogPost").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });

  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(
    `./posts/blogPost/${ctx.params?.slug}.md`
  );
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  console.log(value);
  return {
    props: {
      post: value,
      data,
    },
  };
};

export default Post;
