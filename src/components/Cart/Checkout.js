import { useRef, useState } from "react";
import styled from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const name = useRef();
  const street = useRef();
  const postalCode = useRef();
  const city = useRef();

  const sendOrderHandler = (event) => {
    event.preventDefault();

    const enteredName = name.current.value;
    const enteredStreet = street.current.value;
    const enteredCity = city.current.value;
    const enteredPostalCode = postalCode.current.value;

    const enteredNameisValid = !isEmpty(name.current.value);
    const enteredStreetisValid = !isEmpty(street.current.value);
    const enteredPostalCodeisValid =
      postalCode.current.value.trim().length === 5;
    const enteredCityisValid = !isEmpty(city.current.value);

    setFormInputsValidity({
      name: enteredNameisValid,
      street: enteredStreetisValid,
      postalCode: enteredPostalCodeisValid,
      city: enteredCityisValid,
    });

    const formIsValid =
      enteredNameisValid &&
      enteredStreetisValid &&
      enteredPostalCodeisValid &&
      enteredCityisValid;

    if (!formIsValid) {
      return;
    }
    // submit cart data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };
  const nameControlStyled = `${styled.control} ${
    formInputValidity.name ? "" : styled.invalid
  }`;
  const streetControlStyled = `${styled.control} ${
    formInputValidity.street ? "" : styled.invalid
  }`;
  const poastalCodeControlStyled = `${styled.control} ${
    formInputValidity.postalCode ? "" : styled.invalid
  }`;
  const cityControlStyled = `${styled.control} ${
    formInputValidity.city ? "" : styled.invalid
  }`;
  return (
    <form className={styled.form} onSubmit={sendOrderHandler}>
      <div className={nameControlStyled}>
        <label htmlFor="name">Your Name</label>
        <input ref={name} type="text" id="name"></input>
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlStyled}>
        <label htmlFor="street">Street</label>
        <input ref={street} type="text" id="street"></input>
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={poastalCodeControlStyled}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCode} type="text" id="postal"></input>
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={cityControlStyled}>
        <label htmlFor="city">City</label>
        <input ref={city} type="text" id="city"></input>
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styled.actions}>
        <button type="button" onClick={props.onCloseForm}>
          Close
        </button>
        <button className={styled.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
