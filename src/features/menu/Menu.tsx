import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'
import { PizzaType } from '../../types'

function Menu() {
  const menu = useLoaderData<PizzaType[]>()

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu
