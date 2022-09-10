import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { DELETE_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { useMutation } from "@apollo/client";

export default function DeleteProjectBtn({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    // refetchQueries: [{ query: GET_PROJECTS }],
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  return (
    <button
      className="p-2 flex justify-center bg-red-500 text-white text-xl rounded-md"
      onClick={deleteProject}
    >
      <BsTrash className="icon" />
    </button>
  );
}
