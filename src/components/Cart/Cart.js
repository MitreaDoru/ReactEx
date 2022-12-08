import Modal from "../UI/Modal";
import styled from "./Cart.module.css";
import Wrapper from "../Helper/Helper";
import CartItem from "./CartItem";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const makeOrderHandler = () => {
    setOrder(true);
  };

  const closeFormHandler = (event) => {
    event.preventDefault();
    setOrder(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-29f4a-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styled["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModalContent = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={styled.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCloseForm={closeFormHandler}
        />
      )}
      <div className={styled.actions}>
        {!order && (
          <button className={styled["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {!order && hasItems && (
          <button onClick={makeOrderHandler} className={styled.button}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );
  const isSubittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styled.actions}>
        {
          <button className={styled.button} onClick={props.onClose}>
            Close
          </button>
        }
      </div>
    </React.Fragment>
  );
  return (
    <Wrapper>
      <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    </Wrapper>
  );
};

export default Cart;
