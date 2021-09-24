import { fetchApi } from "lib/api";
import { useQuery } from "react-query";
const { useMutation, useQueryClient } = require("react-query");

const useUser = () => {
  const { isLoading, error, data } = useQuery(
    "user",
    async () => {
      try {
        return await fetchApi("/api/user");
      } catch (error) {
        return null;
      }
    },
    {
      staleTime: 30000,
      cacheTime: Infinity,
    }
  );

  return [isLoading, error, data];
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ email, password }) =>
    fetchApi("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  );
  return {
    SignInLoading: mutation.isLoading,
    SignInError: mutation.error,
    SignIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData("user", user);
        return true;
      } catch (error) {
        return false;
      }
    },
  };
};

export const useSignOut = () => {
  const mutation = useMutation(() => fetchApi("/api/logout"));
  const queryClient = useQueryClient();
  const signOut = async () => {
    try {
      await mutation.mutateAsync();
      queryClient.setQueryData("user", null);
      return true;
    } catch (err) {
      return false;
    }
  };
  return { signOut };
};

export default useUser;
