import type { NextPage } from "next";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@components/button";
import Layout from "@components/layout";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { getClass } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Image from "next/image";

interface ProductWidthUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWidthUser;
  relateProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWRConfig();
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
              src={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${data?.product.image}/public`}
              className="object-center bg-slate-300"
              layout="fill"
              quality={100}
              placeholder="blur"
              blurDataURL={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${data?.product.image}/public`}
            />
          </div>
          <div className="flex py-3 mt-1 space-x-3 border-t border-b cursor-pointer items-cweenter">
            <Image
              src={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${data?.product?.user?.avatar}/avatar`}
              width={48}
              height={48}
              quality={100}
              className="w-12 h-12 rounded-full bg-slate-300"
              placeholder="blur"
              blurDataURL={`https://imagedelivery.net/o6UjupU9bG6h7vfv_qAx8Q/${data?.product?.user?.avatar}/avatar`}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.name}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="mt-3 text-3xl text-gray-900">
              ${data?.product?.price}
            </span>
            <p className="my-6 text-base text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={getClass(
                  "flex items-center justify-center p-3 hover:bg-gray-100  rounded-md",
                  data?.isLiked
                    ? "text-red-400 hover:text-red-500"
                    : "text-gray-400  hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
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
            {data?.relateProducts?.map((item) => (
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

export default ItemDetail;
