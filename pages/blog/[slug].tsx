import { readdirSync } from "fs";
import { NextPage } from "next";

const Post: NextPage = () => {
  return <h1>h1</h1>;
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

export function getStaticProps() {
  return {
    props: {},
  };
}

export default Post;
