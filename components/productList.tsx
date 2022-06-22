import useSWR from "swr";
import { ProductWithFavCount } from "pages";
import Item from "./item";

interface Record {
  id: number;
  product: ProductWithFavCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data?.[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.fav}
        />
      ))}
    </>
  ) : null;
}
