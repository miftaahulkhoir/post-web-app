import React from "react";
import { useSelector } from "react-redux";
import { createTrackedSelector } from "react-tracked";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Modal from "./components/Modal";
const useTrackedSelector = createTrackedSelector(useSelector);

const App = () => {
  const state = useTrackedSelector();
  const { modal } = state.app.showModal;
  return (
    <div className="w-screen h-screen">
      <Toaster
        position="top-left"
        toastOptions={{
          className: "font-popins",
        }}
      />
      <Home />
      {modal && <Modal />}
    </div>
  );
};

export default App;
