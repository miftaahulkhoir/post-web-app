import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTrackedSelector } from "react-tracked";
import { actionPostId } from "../../features/root/appSlice";
const useTrackedSelector = createTrackedSelector(useSelector);

const Button = () => {
  const dispatch = useDispatch();
  const state = useTrackedSelector();
  const id = state.app.postId;

  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={() => dispatch(actionPostId(id + 1))}
        className="w-[30%] px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Get Posts id {id}
      </button>
    </div>
  );
};

export default Button;
