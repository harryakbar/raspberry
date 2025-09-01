import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <Link to={to} className={`p-2 rounded hover:bg-gray-700 text-white ${className}`}>
      {children}
    </Link>
  );
};

export default NavLink;
