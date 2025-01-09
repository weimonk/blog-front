import Header from "@/components/Header";
import Article from "@components/Article";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Post, ErrorObj } from "@utils/types";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorObj>({ message: "" });

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ message: err.message });
        setIsLoading(false);
      });
    document.title = "weimonk - home";
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error.message) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-40">
      <Header />
      <main className="mt-8 flex flex-col gap-y-12">
        {posts.map(({ id, title, date, description, slug }) => (
          <Link key={id} to={`/${slug}`}>
            <Article
              id={id}
              title={title}
              date={date}
              description={description}
            />
          </Link>
        ))}
      </main>
    </div>
  );
}
