import Header from "@/components/Header";
import { formatToReadableDate } from "@/utils";
import { ErrorObj, Post } from "@utils/types";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  if (isLoading) return <div>Loading...</div>;
  if (error.message) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-40">
      <Header />
      <main className="mt-10">
        <h1 className="text-4xl font-black text-sunglow">{post.title}</h1>
        <p className="mt-5 text-sm text-gray-300">
          {formatToReadableDate(post.date)}
        </p>
        <Markdown
          children={post.body}
          className="prose prose-invert mt-10"
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  codeTagProps={{ ...rest }}
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={style}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </main>
    </div>
  );
}
