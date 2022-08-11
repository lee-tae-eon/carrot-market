import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface BlogPost {
  data: {
    title: string;
    date: number;
  };
  content: string;
}

// interface BlogPostPRops {
//   posts: BlogPost;
// }

const Blog: NextPage<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <Layout title="Blog">
      <h1 className="mt-10 text-lg font-semibold">First Post:</h1>
      <ul>
        <li>Welcome everyone!</li>
      </ul>
      {posts.map((post, idx) => (
        <div
          key={idx}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        ></div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const files = readdirSync("./posts/blogPost").map((file) => {
    const content = readFileSync(`./posts/blogPost/${file}`);
    return { data: matter(content).data, content: matter(content).content };
  });

  return {
    props: {
      posts: files,
    },
  };
}

export default Blog;
