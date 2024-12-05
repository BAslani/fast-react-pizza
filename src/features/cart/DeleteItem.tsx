import { useAppDispatch } from "../../store";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

type Props = {
  pizzaId: number;
};

export default function DeleteItem({ pizzaId }: Props) {
  const dispatch = useAppDispatch();
  return (
    <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}
