import axios from "axios";
import useSWR from "swr";

export const usePost = (postId) => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  return {
    postData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
