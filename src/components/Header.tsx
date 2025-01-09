import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-9">
      <p className="text-xl font-black">
        <Link to="/">weimonk</Link>
      </p>
      <Link to="https://github.com/weimonk">
        <FaGithub size="1.5rem" />
      </Link>
    </header>
  );
}
