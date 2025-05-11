import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Loading } from "../utils";
import { UserForm } from "../components";

const CustomerUpdate = () => {
  const { username } = useParams();
  const { data, loading } = useFetch<UserType>(`/user/admin/${username}`);

  if (loading || !data?.username) return <Loading />;

  return (
    <div>
      <UserForm userData={data} />
    </div>
  );
};

export default CustomerUpdate;
