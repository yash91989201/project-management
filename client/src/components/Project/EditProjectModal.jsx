import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
const modalBackDropStyle =
  "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70";

const setStatusValue = (val) => {
  switch (val) {
    case "NOT STARTED":
      return "notstarted";
    case "IN PROGRESS":
      return "inprogress";
    default:
      return "completed";
  }
};

const AddProjectModal = ({ modal, setModal, project }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    status: setStatusValue(project.status),
    description: project.description,
  });
  const handleChange = (e) => {
    setFormData((prevVal) => {
      return {
        ...prevVal,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [editProject] = useMutation(EDIT_PROJECT, {
    variables: {
      id: project.id,
      name: formData.name,
      status: formData.status,
      description: formData.description,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.length > 0 &&
      formData.status.length > 0 &&
      formData.description.length > 0
    ) {
      editProject();
      setModal(false);
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
          <div className="flex flex-col space-y-3 ">
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
              onClick={() => setModal(false)}
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
