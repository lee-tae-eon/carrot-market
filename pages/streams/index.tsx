import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";

import useSWR from "swr";
import { Stream } from "@prisma/client";
import Image from "next/image";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<StreamsResponse>(`/api/streams?page=1&skip=20`);

  return (
    <Layout title="라이브" hasTabBar>
      <div className="pt-10 space-y-4 divide-y-2 py-14 ">
        {data?.streams?.map((stream, i) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="block px-4 pt-4">
              <div className="relative w-full overflow-hidden rounded-md shadow-sm aspect-video">
                <Image
                  layout="fill"
                  src={`https://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbnail.jpg?time=68s&height=270`}
                />
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
