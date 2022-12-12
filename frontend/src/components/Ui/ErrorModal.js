//import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import Button from "../Ui/Button";
import classes from "./ErrorModal.module.css";
import Card from "./Card";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ErrorModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.btnFooter}>
        <Button onClick={props.onConfirm}>ok</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <ErrorModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ErrorModal;
