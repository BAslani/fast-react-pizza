import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  to: string;
};

const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

export default function LinkButton({ children, to }: Props) {
  const navigate = useNavigate();
  if (to === "-1") {
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );
  }
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}
