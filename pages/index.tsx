import type { NextPage } from "next";

import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";
import Image from "next/image";
import screenshot from "../public/screen.png";

export interface ProductWithFavCount extends Product {
  _count: {
    fav: number;
  };
}

interface ProductResType {
  ok: boolean;
  products: ProductWithFavCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  const { data } = useSWR<ProductResType>("/api/products");

  return (
    <Layout title={"홈"} hasTabBar>
      <Head>
        <title>HOME</title>
      </Head>
      <div className="flex flex-col py-10 space-y-5">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count.fav}
            comments={1}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
      <Image src={screenshot} placeholder="blur" quality={5} />
    </Layout>
  );
};

export default Home;
