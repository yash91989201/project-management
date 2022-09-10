import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $status: ProjectStatus!
    $description: String!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      status: $status
      description: $description
      clientId: $clientId
    ) {
      id
      name
      status
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation editProject(
    $id: ID!
    $name: String!
    $status: UpdateProjectStatus!
    $description: String!
  ) {
    editProject(
      id: $id
      name: $name
      status: $status
      description: $description
    ) {
      id
      name
      status
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      status
      description
    }
  }
`;

export { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT };
