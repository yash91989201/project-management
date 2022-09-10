import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
const modalBackDropStyle =
  "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70";

const AddProjectModal = ({ modal, setModal }) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    description: "",
    clientId: "",
  });

  const handleChange = (e) => {
    setFormData((prevVal) => {
      return {
        ...prevVal,
        [e.target.name]: e.target.value,
      };
    });
  };
  const clearForm = () => {
    setFormData({
      name: "",
      status: "",
      description: "",
      clientId: "",
    });
  };
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: formData.name,
      status: formData.status,
      description: formData.description,
      clientId: formData.clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.length > 0 &&
      formData.status.length > 0 &&
      formData.description.length > 0 &&
      formData.clientId.length > 0
    ) {
      addProject();
      setModal(false);
      clearForm();
    }
  };

  return (
    <div className={modal ? modalBackDropStyle : "hidden"}>
      <dialog className="w-[560px] flex flex-col items-center rounded-md space-y-6 overflow-hidden">
        <h2 className="text-4xl font-semibold ">New Project</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-3/4 flex flex-col space-y-12"
        >
          <div className="flex flex-col space-y-3">
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                className="p-4 px-2 w-full  border"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
                value={formData.name}
              />
            </label>
            <label htmlFor="status" className="space-x-3 flex items-center">
              <span className="w-1/2">Project Status</span>
              <select
                name="status"
                className="w-1/2 p-2 bg-transparent border-gray-700 border rounded-sm cursor-pointer"
                value={formData.status}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select Project Status</option>
                <option value="notstarted" className="bg-white">
                  Not Started
                </option>
                <option value="inprogress" className="bg-white">
                  In Progress
                </option>
                <option value="completed" className="bg-white">
                  Completed
                </option>
              </select>
            </label>
            <label
              htmlFor="clientId"
              className="space-x-3 flex justify-between items-center"
            >
              <span className="w-1/2"> Client Id</span>
              <select
                name="clientId"
                className="w-1/2 p-2 bg-transparent border-gray-700 border rounded-sm cursor-pointer"
                value={formData.clientId}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select Client</option>
                {!loading &&
                  !error &&
                  data.clients.map((client) => (
                    <option
                      key={client.id}
                      value={client.id}
                      className="bg-white"
                    >
                      {client.name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="description">
              <textarea
                name="description"
                className="p-4 px-2 w-full  border"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                value={formData.description}
              />
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full mr-2 py-2 bg-blue-500 text-white rounded-full "
            >
              Submit
            </button>
            <p
              onClick={() => {
                setModal(false);
                clearForm();
              }}
              className="w-full ml-2 py-2 border  bg-red-500 text-white rounded-full text-center cursor-pointer"
            >
              Close
            </p>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddProjectModal;
