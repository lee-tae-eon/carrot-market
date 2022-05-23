import { useRouter } from "next/router";

import useSWR from "swr";
import { useEffect } from "react";
import { User } from "@prisma/client";

interface UserMeProps {
  ok: boolean;
  profile: User;
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
