import styled from "./Modal.module.css";

import ReactDOM from "react-dom";
import { Fragment } from "react";
const Backdrop = (props) => {
  return <div className={styled.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styled.modal}>
      <div className={styled.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
