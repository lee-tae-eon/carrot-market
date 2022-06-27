import { useRouter } from "next/router";

import useSWR from "swr";
import { useEffect } from "react";
import { User } from "@prisma/client";

interface UserMeProps {
  ok: boolean;
  errors: string;
  profile: User;
}

export default function useUser(isEnter?: boolean) {
  const { data, error } = useSWR<UserMeProps>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (!data?.ok && !isEnter) {
      router.replace("/enter");
    } else if (isEnter && data && data.ok) {
      router.replace("/");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
