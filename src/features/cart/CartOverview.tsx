import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import { getNumberOfPizzas, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const numberOfPizzas = useAppSelector(getNumberOfPizzas);

  if (!numberOfPizzas) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-slate-300 sm:space-x-6">
        <span>{numberOfPizzas} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
