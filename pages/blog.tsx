import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";

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
    console.log(content);
  });

  return {
    props: {},
  };
}
