import { useQuery } from "@apollo/client";
// custom queries
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
// custom component
import ClientRow from "./ClientRow";

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error occoured {error.message}</p>;
  return (
    <div className="pr-12 flex-1 space-y-3">
      <div className="flex  bg-blue-500 rounded-md text-white">
        <p className="p-2 w-[20%]  font-semibold ">Name</p>
        <p className="p-2 w-[40%]  font-semibold  border-x-2">Email</p>
        <p className="p-2 w-[30%]  font-semibold  border-x-2">Phone No.</p>
        <p className="p-2 w-[10%]   font-semibold text-center">Delete</p>
      </div>
      <div className="space-y-2">
        {data.clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Clients;
