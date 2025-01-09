import { formatToReadableDate } from "@/utils";

interface ArticleProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

function Article(props: ArticleProps) {
  const formattedDate = formatToReadableDate(props.date);
  return (
    <div className="transition-transform hover:scale-[102%]">
      <h2 className="text-3xl font-black text-sunglow">{props.title}</h2>
      <p className="mt-1 text-sm text-gray-300">{formattedDate}</p>
      <p className="mt-1 text-lg">{props.description}</p>
    </div>
  );
}

export default Article;
