import styled from "./MealsItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={styled.meal}>
      <div className={styled.title}>
        <h3>{props.name}</h3>
        <div className={styled.description}>{props.description}</div>
        <div className={styled.price}>{price}</div>
      </div>
      <MealItemForm onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealsItem;
