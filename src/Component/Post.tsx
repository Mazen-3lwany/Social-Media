import profile from "../Images/user.png";
import { useInfiniteQuery } from '@tanstack/react-query';
import { ShowPosts } from "./authorization";
import { Link } from "react-router-dom";
import { useRef, useCallback } from "react";

export default function Posts() {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ShowPosts,
        initialPageParam: 1, // 🔧 This is required!
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length > 0 ? pages.length + 1 : undefined;
        },
    });
    

const observer = useRef<IntersectionObserver | null>(null);

const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
        if (isLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    });
    if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, isFetchingNextPage]
);

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10">Something went wrong!</p>;

    return (
    <div className="flex flex-col max-w-3xl mx-auto my-10 py-7 shadow-lg rounded-xl mt-28">
        {data?.pages.map((page, pageIndex) =>
        page.map((post, index) => {
            const isLast =
            pageIndex === data.pages.length - 1 &&
            index === page.length - 1;

            return (
            <div
                key={post.id}
                ref={isLast ? lastPostRef : null}
                className="mb-5 bg-indigo-100 p-5 rounded-lg shadow-md"
            >
              {/* Header */}
                <div className="flex flex-row mb-4">
                    <Link to={`/users/${post.author.id}`}>
                    <img
                        src={post.author?.profile_image || profile}
                        className="w-15 h-15 rounded-full"
                        alt="Profile"
                    />
                    </Link>
                    <div className="flex flex-col ml-2 justify-center">
                    <p className="text-xl font-semibold">
                        {post.author?.name || "Unknown"}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                        {post.created_at} 📅
                    </p>
                    </div>
                </div>

              {/* Title and Body */}
                <h2 className="text-xl font-bold">{post.title || "No Title"}</h2>
                <p className="text-gray-700 mb-5">
                    {post.body || "No content available"}
                </p>

              {/* Image */}
                {post.image && (
                    <div className="flex justify-center">
                    <img
                        src={post.image}
                        className="w-full object-cover rounded-lg"
                        alt="Post"
                    />
                    </div>
                )}

              {/* Comments */}
                <Link to={`posts/${post.id}`}>
                    <p className="text-indigo-400 cursor-pointer mt-2">
                    💬 {post.comments_count} Comments
                    </p>
                </Link>
                </div>
            );
            })
        )}

        {isFetchingNextPage && <p className="text-center mt-5">Loading more posts...</p>}
        {!hasNextPage && <p className="text-center mt-5 text-gray-500">No more posts 😴</p>}
        </div>
    );
}
