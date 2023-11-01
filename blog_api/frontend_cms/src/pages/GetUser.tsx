import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { useTitle } from "../hooks/useTitle";

export const GetUser = () => {
  useTitle("Get User | Blog CMS");

  const { data } = currentUserApiSlice.useMeQuery();

  if (!data) {
    return <div>no data</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
