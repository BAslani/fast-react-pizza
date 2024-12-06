import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { OrderType } from "../../types";
import Button from "../../ui/Button";
import store, { useAppDispatch, useAppSelector } from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { FormEvent, useState } from "react";
import { fetchAddress } from "../users/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const {
    username,
    status: adressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useAppDispatch();

  const isLoadingAddress = adressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className="input w-full"
            />
            {adressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position?.latitude && !position?.longitude && (
            <span className="absolute right-[3px] top-[35px] z-20 sm:top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onLocation={(e: FormEvent) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 font-medium accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={position ? `${position.latitude},${position.longitude}` : ""}
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "on",
  };

  const errors = {};

  if (!isValidPhone((order as OrderType).phone))
    (errors as { phone: string }).phone =
      "Please enter your correct phone number, we might need to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  console.log("ORDER:", order);

  const newOrder = await createOrder(order as OrderType);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
