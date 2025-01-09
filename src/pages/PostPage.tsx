import Header from "@/components/Header";
import { formatToReadableDate } from "@/utils";
import { ErrorObj, Post } from "@utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Markdown from "react-markdown";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorObj>({ message: "" });

  useEffect(() => {
    fetch(`http://localhost:3000/posts?slug=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!data.length) throw new Error("404 not found");
        setPost(data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ message: err.message });
        setIsLoading(false);
      });
  });

  if (isLoading) {
    document.title = "Loading post...";
    return <div>Loading...</div>;
  }
  if (error.message) return <div>Error: {error.message}</div>;

  document.title = `weimonk - ${post.title.toLowerCase()}`;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-40">
      <Header />
      <main className="mt-10">
        <h1 className="text-4xl font-black text-sunglow">{post.title}</h1>
        <p className="mt-5 text-sm text-gray-300">
          {formatToReadableDate(post.date)}
        </p>
        <Markdown className="prose prose-invert mt-10">{post.body}</Markdown>
      </main>
    </div>
  );
}
