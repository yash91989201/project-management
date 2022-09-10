import { SiGraphql } from "react-icons/si";

const Header = () => {
  return (
    <header className="py-6 flex max-w-6xl mx-auto ">
      <nav>
        <a
          href="/"
          className="flex items-center justify-center text-4xl font-semibold space-x-4 "
        >
          <SiGraphql className="text-[#e535ab]" />
          <span>Project Mgmt</span>
        </a>
      </nav>
    </header>
  );
};
export default Header;
