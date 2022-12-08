import { Fragment } from "react";
import styled from "./Header.module.css";
import mealsImage from "./meals.jpg";
import HeaderCartButton from "../Layout/HeaderButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={styled.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styled["main-image"]}>
        <img src={mealsImage} alt="Table whit food on it" />
      </div>
    </Fragment>
  );
};

export default Header;
