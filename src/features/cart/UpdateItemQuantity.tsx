import { useAppDispatch } from "../../store";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

type Props = {
  pizzaId: number;
  currentQuantity: number;
};

export default function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="round"
      >
        -
      </Button>
      <span className="text-sm font-semibold">{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}
