import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

interface BlogPost {
  data: {
    title: string;
    date: number;
  };
  content: string;
}

export default function Blog() {
  return (
    <Layout title="Blog">
      <h1 className="mt-10 text-lg font-semibold">First Post:</h1>
      <ul>
        <li>Welcome everyone!</li>
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return { data: matter(content).data, content: matter(content).content };
  });

  return {
    props: {
      ...files,
    },
  };
}
