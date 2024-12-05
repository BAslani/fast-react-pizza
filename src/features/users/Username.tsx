import { useAppSelector } from "../../store";

export default function Username() {
  const { username } = useAppSelector((state) => state.user);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}
