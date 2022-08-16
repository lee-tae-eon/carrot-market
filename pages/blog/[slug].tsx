import { NextPage } from "next";

const Post: NextPage = () => {
  return <h1>h1</h1>;
};

export function getStaticProps() {
  return {
    props: {},
  };
}

export default Post;
