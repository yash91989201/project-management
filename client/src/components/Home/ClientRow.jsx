import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { BsTrash } from "react-icons/bs";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  return (
    <div className="flex bg-blue-100/60 rounded-md items-center">
      <p className="p-2 w-[20%]">{client.name}</p>
      <p className="p-2 w-[40%]">{client.email}</p>
      <p className="p-2 w-[30%]">{client.phone}</p>
      <p className="p-2 w-[10%]  flex justify-center ">
        <button
          className="p-2 w-full flex justify-center rounded-md bg-red-500 text-xl"
          onClick={deleteClient}
        >
          <BsTrash className="text-white" />
        </button>
      </p>
    </div>
  );
}
