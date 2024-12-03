export type PizzaType = {
  id: number
  imageUrl: string
  ingredients: string[]
  name: string
  soldOut: boolean
  unitPrice: number
}

type CartType = {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type OrderType = {
  address: string
  cart: CartType[]
  customer: string
  phone: string
  priority: boolean
}
