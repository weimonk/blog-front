import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex items-baseline justify-between py-9">
      <p className="text-xl font-black">
        <Link to="/">waymond</Link>
      </p>
    </header>
  );
}
