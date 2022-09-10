import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
const modalBackDropStyle =
  "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70";

const AddClientModal = ({ modal, setModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      email: "",
      phone: "",
    });
  };
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.phone.length > 0
    ) {
      addClient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      setModal(false);
      clearForm();
    }
  };

  return (
    <div className={modal ? modalBackDropStyle : "hidden"}>
      <dialog className="w-[560px] flex flex-col items-center rounded-md space-y-6 overflow-hidden">
        <h2 className="text-4xl font-semibold ">Add Client</h2>
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
            <label htmlFor="email">
              <input
                type="text"
                name="email"
                className="p-4 px-2 w-full  border"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                value={formData.email}
              />
            </label>
            <label htmlFor="phone">
              <input
                type="text"
                name="phone"
                className="p-4 px-2 w-full  border"
                placeholder="Phone No."
                onChange={(e) => handleChange(e)}
                value={formData.phone}
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

export default AddClientModal;
