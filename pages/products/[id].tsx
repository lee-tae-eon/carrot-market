import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@components/button";
import Layout from "@components/layout";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { getClass } from "@libs/client/utils";
// import useUser from "@libs/client/useUser";
import Image from "next/image";
import client from "@libs/server/client";

interface ProductWidthUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWidthUser;
  relateProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relateProducts,
  isLiked,
}) => {
  // const { user, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  // const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${id}` : null
  );

  const [toggleFav] = useMutation(`/api/products/${id}/fav`);

  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // * unbound mutate test
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({});
  };

  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              src={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${product.image}/public`}
              className="object-center bg-slate-300"
              layout="fill"
              quality={100}
              placeholder="blur"
              blurDataURL={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${product.image}/public`}
            />
          </div>
          <div className="flex py-3 mt-1 space-x-3 border-t border-b cursor-pointer items-cweenter">
            <Image
              src={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${product?.user?.avatar}/avatar`}
              width={48}
              height={48}
              quality={100}
              className="w-12 h-12 rounded-full bg-slate-300"
              placeholder="blur"
              blurDataURL={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${product?.user?.avatar}/avatar`}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {product?.user?.name}
              </p>
              <Link href={`/users/profile/${product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <span className="mt-3 text-3xl text-gray-900">
              ${product?.price}
            </span>
            <p className="my-6 text-base text-gray-700">
              {product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={getClass(
                  "flex items-center justify-center p-3 hover:bg-gray-100  rounded-md",
                  isLiked
                    ? "text-red-400 hover:text-red-500"
                    : "text-gray-400  hover:text-gray-500"
                )}
              >
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {relateProducts?.map((item) => (
              <div key={item.id}>
                <Link href={`/products/${item.id}`}>
                  <a>
                    <div className="w-full h-56 mt-6 bg-slate-300" />
                    <h3 className="-mb-1 text-gray-700">{item.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      ${item.price}
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
// * get Static paths를  빈배열로 설정 후 blocking설정
// * 빌드시에는 paths가 없기에 하위 html이 생성 되지 않는다
// * 하지만 방문시에 fallback이 관여함
// * getstaticProps 또는 getStaticPaths를 가지고 있는 페이지를 방문 할 때
// * 해당 페이지에 HTML이 없다면 fallback  blocking 은
// * 유저를 잠시 기다리게 만들고 그동안 백그라운드에서 페이지를 만들어서 유저에게 넘겨준다.
// ! 만약 blocking 사용중 만들어진 page가 없다면 blank 화면을 보게된다.
// ! 그리고 나서 getStaticProps 가 실행이 되고 페이지가 서버사이드 랜더링 되고 페이지가 준비되면 유저가 사이트 보는 것이 가능
// ! fallback false를 쓰면 어떤 페이지든 프로젝트의 빌드과정에서 만들어진 페이지만  보여질 수 있고 아니면 404 페이지를 보게 된다.
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};
// * server에서 직접 db쳐서 가져와서 prop전달
// * pre generate하지만 각 id에 대해 전부 하지 않고 slug페이지만 만들어두고
// * id값을 받아서 fetching후 해당페이지 생성
export const getStaticProps: GetStaticProps = async (ctx) => {
  // * ctx에 id가 없으면 리턴
  if (!ctx.params?.id) {
    return {
      props: {},
    };
  }

  const id = ctx.params?.id;

  const product = await client.product.findUnique({
    where: {
      id: +ctx.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relateProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = false;

  // Boolean(
  //   await client.fav.findFirst({
  //     where: {
  //       productId: product?.id,
  //       userId: user?.id,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   })
  // );
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relateProducts: JSON.parse(JSON.stringify(relateProducts)),
      isLiked,
    },
  };
};

export default ItemDetail;

// fallback: false
// fallback이 false인 경우 getStaticPaths에서 반환하지 않은 모든 경로는 404 페이지가 됩니다. next build가 실행되면 Next.js는 getStaticPaths가 fallback: false를 반환했는지 확인한 다음 getStaticPaths가 반환한 경로만 빌드합니다. 이 옵션은 생성할 경로가 적거나 새 페이지 데이터가 자주 추가되지 않는 경우에 유용합니다.

// fallback: true
// fallback이 true인 경우, 빌드 시 생성되지 않은 경로는 404 페이지를 생성하지 않습니다. 대신 Next.js는 이러한 경로에 대한 첫 번째 요청에서 페이지의 "fallback" 버전(isFallback)을 제공합니다. Google과 같은 웹 크롤러는 fallback 서비스를 제공하지 않으며 대신 경로는 fallback: 'blocking'과 같이 작동합니다. 백그라운드에서 Next.js는 요청된 경로 HTML 및 JSON을 정적으로 생성합니다.

// fallback: true가 언제 유용합니까?
// fallback: true는 데이터에 의존하는 static 페이지가 많은 경우에 유용합니다(예: 매우 큰 전자 상거래 사이트). 모든 제품 페이지를 미리 렌더링하려면 빌드 시간이 매우 오래 걸립니다.

// Fallback pages
// router를 사용하여 fallback이 렌더링되고 있는지 감지할 수 있습니다. fallback이 렌더링되고 있다면 router.isFallback은 true가 됩니다.
// ```
// // 페이지가 아직 생성되지 않은 경우 getStaticProps() 실행이 완료될 때까지 아래 로딩이 표시됩니다.
// if (router.isFallback) {
// return < div>Loading...< /div>
// }
// ```
// https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-pages

// fallback: blocking
// getStaticProps나 getStaticPaths를 가지고 있는 페이지에 방문할 때, 만약 그 페이지에 해당하는 HTML 파일이 없다면, fallback: blocking은 유저를 잠시동안 기다리게 만들고, 그동안 백그라운드에서 페이지를 만들어서 유저에게 넘겨줍니다.
