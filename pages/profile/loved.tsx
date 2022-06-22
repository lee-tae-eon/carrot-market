import type { NextPage } from "next";

import Layout from "@components/layout";
import ProductList from "@components/productList";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col pb-10 space-y-5 divide-y">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
