import { useRouter } from "next/router";

import useSWR from "swr";
import { useEffect } from "react";

interface UserMeProps {
  ok: boolean;
  profile: GetProfileProps;
}

interface GetProfileProps {
  avatar: string | null;
  createdAt: Date;
  email: string | null;
  id: number;
  name: string;
  phone: string | null;
  updatedAt: Date;
}

export default function useUser() {
  const { data, error } = useSWR<UserMeProps>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
