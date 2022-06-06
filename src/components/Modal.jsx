import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { createTrackedSelector } from "react-tracked";
import axios from "axios";
import toast from "react-hot-toast";
import { actionShowModal, actionDefaultPost } from "../features/root/appSlice";
const useTrackedSelector = createTrackedSelector(useSelector);

const Modal = () => {
  const state = useTrackedSelector();
  const { modal } = state.app.showModal;
  const { data } = state.app.edit;
  // ref input
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const userIDRef = useRef(null);
  // funtion CRUDS
  const saveData = () => {
    const dataPromis = axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        userId: userIDRef.current.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    toast.promise(
      dataPromis,
      {
        loading: "Loading",
        success: (data) => {
          dispatch(actionDefaultPost({ data: data.data }));
          dispatch(actionShowModal(false));
          return `Successfully saved data`;
        },
        error: (err) => `This just happened: ${err.response.message}`,
      },
      {
        style: {
          minWidth: "250px",
          filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
  };
  const updateData = () => {
    const dataPromis = axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${data.id}`,
      {
        title: titleRef.current.value ? titleRef.current.value : data.title,
        body: bodyRef.current.value ? bodyRef.current.value : data.body,
        userId: userIDRef.current.value ? userIDRef.current.value : data.userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    toast.promise(
      dataPromis,
      {
        loading: "Loading",
        success: (data) => {
          dispatch(actionDefaultPost({ data: data.data }));
          dispatch(actionShowModal(false));
          return `Successfully UPDATE data`;
        },
        error: (err) => `This just happened: ${err.response.message}`,
      },
      {
        style: {
          minWidth: "250px",
          filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
  };
  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(actionShowModal(!modal))}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-customblack opacity-80" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-start"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-popins font-medium leading-6 text-gray-900"
              >
                Form Add New Post
              </Dialog.Title>
              <hr className="w-full bg-gray-100" style={{ height: "1px" }} />
              <div className="mt-5">
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                    Add Some New post
                  </h2>
                  <div>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="title"
                        >
                          Title
                        </label>
                        <input
                          placeholder={
                            Object.keys(data).length === 0 ? "" : data.title
                          }
                          id="title"
                          ref={titleRef}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="body"
                        >
                          Body
                        </label>
                        <input
                          placeholder={
                            Object.keys(data).length === 0 ? "" : data.body
                          }
                          ref={bodyRef}
                          id="body"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-200"
                          htmlFor="userid"
                        >
                          User ID
                        </label>
                        <input
                          placeholder={
                            Object.keys(data).length === 0 ? "" : data.userId
                          }
                          ref={userIDRef}
                          id="userid"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      {Object.keys(data).length === 0 ? (
                        <button
                          onClick={saveData}
                          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={updateData}
                          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </section>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => dispatch(actionShowModal(!modal))}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
