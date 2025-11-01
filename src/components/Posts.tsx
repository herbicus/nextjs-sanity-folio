// src/components/Posts.tsx
import React from "react";
import Link from "next/link";

import { POSTS_QUERYResult } from "../../sanity.types";

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  if (!posts)
    return (
      <div className="py-10">
        <span className="text-center block w-full text-gray-500">
          No posts found
        </span>
      </div>
    );

  return (
    <ul className="grid grid-cols-1 divide-y divide-blue-100">
      {posts.map((post) => (
        <li key={post._id}>
          <Link
            className="block p-4 hover:bg-blue-50 text-lg font-bold"
            href={`/posts/${post?.slug?.current}`}
          >
            {post?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
