import { useRouter } from "next/router";

import useSWR from "swr";
import { useEffect } from "react";
import { User } from "@prisma/client";

interface UserMeProps {
  ok: boolean;
  profile: User;
}

export default function useUser(isEnter?: string) {
  const { data, error } = useSWR<UserMeProps>("/api/users/me", null, {});
  const router = useRouter();

  useEffect(() => {
    if (data && !data?.ok) {
      router.replace("/enter");
    } else if (isEnter === "/enter" && data && data.ok) {
      router.replace("/");
    }
  }, [data, router, isEnter]);

  return { user: data?.profile, isLoading: !data && !error };
}
