import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface BlogPost {
  data: {
    title: string;
    date: number;
    slug: string;
  };
  content: string;
}

// interface BlogPostPRops {
//   posts: BlogPost;
// }

const Blog: NextPage<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <Layout title="Blog">
      {posts.map((post, idx) => (
        <div key={idx}>
          <Link href={`/blog/${post?.data?.slug}`}>
            <a>
              <h2 className="mt-10 text-lg font-semibold">
                {post?.data?.title} :
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              ></div>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const files = readdirSync("./posts/blogPost").map((file) => {
    const content = readFileSync(`./posts/blogPost/${file}`);
    const [slug, _] = file.split(".");
    return {
      data: { ...matter(content).data, slug },
      content: matter(content).content,
    };
  });

  return {
    props: {
      posts: files,
    },
  };
}

export default Blog;
