import { useState } from "react";
import Clients from "../components/Home/Clients";
import Projects from "../components/Home/Projects";
import AddClientModal from "../components/Home/AddClientModal";
import AddProjectModal from "../components/Home/AddProjectModal";
// import react icons
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiMenuAddLine } from "react-icons/ri";

const Home = () => {
  const [clientModal, setClientModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);

  return (
    <>
      <div className="flex flex-row space-x-6">
        <button
          onClick={() => setClientModal(true)}
          className="py-2 px-3 flex items-center rounded-md space-x-2 bg-purple-500 text-white"
        >
          <AiOutlineUserAdd />
          <span>Add Client</span>
        </button>
        <button
          onClick={() => setProjectModal(true)}
          className="py-2 px-3 flex items-center rounded-md space-x-2 bg-pink-500 text-white"
        >
          <RiMenuAddLine />
          <span>Add Project</span>
        </button>
      </div>
      <div className="my-6 max-w-6xl mx-auto flex ">
        <Clients />
        <Projects />
      </div>
      <AddClientModal modal={clientModal} setModal={setClientModal} />
      <AddProjectModal modal={projectModal} setModal={setProjectModal} />
    </>
  );
};

export default Home;
