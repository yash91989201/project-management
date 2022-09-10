import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
// custom queries
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import DeleteProjectBtn from "./DeleteProjectBtn";

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error occoured {error.message}</p>;
  return (
    <div className="flex flex-col w-1/4">
      <h2 className="mb-2 py-2  font-semibold text-center border rounded-md bg-amber-400 text-white">
        Project List
      </h2>
      <div className="space-y-3">
        {data.projects.map((project) => (
          <div
            key={project.id}
            className="w-72 p-2 py-4  flex flex-col border-2 rounded-md"
          >
            <h3 className="my-1 font-medium text-xl">{project.name}</h3>
            <h6 className="font-medium text-sm">
              Status: <span className="font-semibold">{project.status}</span>{" "}
            </h6>
            <div className="my-2 flex justify-between items-center">
              <Link
                to={`/project/${project.id}`}
                className="py-1.5 px-6  bg-gray-200 rounded-md "
              >
                View
              </Link>
              <DeleteProjectBtn projectId={project.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
