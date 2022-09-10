import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import graphql query
import { GET_PROJECT } from "../graphql/queries/projectQueries";
// import custom components
import EditProjectModal from "../components/Project/EditProjectModal";
// import react icons
import { AiFillEdit } from "react-icons/ai";

const Project = () => {
  const id = useParams().id;
  const [editModal, setEditModal] = useState(false);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error occoured {error.message}</p>;
  return (
    <>
      <div>
        <button
          onClick={() => setEditModal(true)}
          className="py-2 px-3 flex items-center rounded-md space-x-2 bg-purple-500 text-white"
        >
          <AiFillEdit />
          <span>Edit Project</span>
        </button>
        <p>Project Details</p>
        <p>Name : {data.project.name}</p>
        <p>Status : {data.project.status}</p>
        <p>Description : {data.project.description}</p>
      </div>
      <EditProjectModal
        modal={editModal}
        setModal={setEditModal}
        project={data.project}
      />
    </>
  );
};

export default Project;
