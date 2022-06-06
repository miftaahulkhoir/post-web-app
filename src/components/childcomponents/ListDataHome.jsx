import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createTrackedSelector } from "react-tracked";
import toast from "react-hot-toast";
import { PlusIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { usePost } from "../../customHook/usePost";
import {
  actionDefaultPost,
  actionEdit,
  actionShowModal,
} from "../../features/root/appSlice";
const useTrackedSelector = createTrackedSelector(useSelector);

const ListDataHome = () => {
  const dispatch = useDispatch();
  const state = useTrackedSelector();
  const id = state.app.postId;
  const { postData, isLoading, isError } = usePost(id);
  const { data: defaultPost } = state.app.defaultPost;

  useEffect(() => {
    if (isLoading) {
      dispatch(
        actionDefaultPost({
          data: {
            id: 1,
            title: "Lorem ipsum",
            body: "hellow word",
            userId: 1,
          },
        })
      );
    } else {
      dispatch(actionDefaultPost({ data: postData }));
    }
  }, [postData]);

  const deleteData = (id) => {
    const processDelete = axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    toast.promise(
      processDelete,
      {
        loading: "Loading",
        success: (data) => {
          dispatch(actionDefaultPost({ data: data.data }));
          return `Successfully delete data,`;
        },
        error: (err) => `Bad, ${err.response.statusText}`,
      },
      {
        style: {
          minWidth: "250px",
          backgroundColor: "rgb(14 165 233)",
          color: "white",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
          Test ReactJS Developer
        </h1>
        <div className="w-full flex justify-end items-center mb-10 mt-10">
          <button
            onClick={() => dispatch(actionShowModal({ modal: true }))}
            className="flex items-center w-[25%] lg:w-[10%] px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            <p>Posts</p>
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-400 mt-20">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">error on {isError.message}</p>
        ) : (
          <div className="mt-12 space-y-8">
            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <div className="w-[70%] flex justify-start items-center">
                  <h1 className="font-semibold text-gray-700 dark:text-white truncate">
                    {defaultPost.title}
                  </h1>
                  <PencilAltIcon
                    onClick={() => {
                      dispatch(
                        actionEdit({
                          data: {
                            id: defaultPost.id,
                            title: defaultPost.title,
                            body: defaultPost.body,
                            userId: defaultPost.userId,
                          },
                        })
                      );
                      dispatch(actionShowModal({ modal: true }));
                    }}
                    className="w-6 h-6 text-gray-500 ml-2"
                  />
                  <TrashIcon
                    onClick={() => deleteData(defaultPost.id)}
                    className="w-6 h-6 text-red-500 ml-2"
                  />
                </div>
                <span className="text-gray-600 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                  {defaultPost.userId}
                </span>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />
              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {defaultPost.body}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListDataHome;
