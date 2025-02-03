import Link from "next/link";

interface Props {
    href:       string,
    label:      string,
    icon?:      React.ElementType,
    className?: string
}
export const NavLink = ({ href, label, icon: Icon, className = "" }: Props) => (
    <Link
      href={href} 
      className={`flex items-center space-x-2 hover:text-indigo-200 transition-colors ${className}`} 
      aria-label={label}
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </Link>
  );