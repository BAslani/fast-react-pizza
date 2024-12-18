import { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: "small" | "primary" | "secondary" | "round";
  onClick?: () => void;
  onLocation?: (e: FormEvent) => void;
};

export default function Button({
  children,
  disabled,
  to,
  type,
  onClick,
  onLocation,
}: Props) {
  const base =
    "rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed inline-block";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-4 md:py-2.5 text-xs",
    secondary:
      "rounded-full text-sm border-2 border-stone-300 px-4 py-2.5 md:px-6 md:py-3.5 font-semibold uppercase tracking-wide text-stone-400 hover:text-stone-800 transition-colors duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed inline-block",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onLocation ? onLocation : onClick}
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}
