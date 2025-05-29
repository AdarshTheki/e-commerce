import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Loading } from "../utils";
import { UserForm } from "../components";

const CustomerUpdate = () => {
  const { id } = useParams();
  const { data, loading } = useFetch<UserType>(`/user/admin/${id}`);

  if (loading || !data?._id) return <Loading />;

  return (
    <div>
      <UserForm userData={data} />
    </div>
  );
};

export default CustomerUpdate;
