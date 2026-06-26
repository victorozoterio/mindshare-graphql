import { gql } from "@apollo/client";

export const LIST_IDEAS = gql`
  query ListIdeas {
    listIdeas {
      id
      title
      description
      authorId
      author {
        id
        name
        email
      }
      voteCount
      comments {
        id
        ideaId
        authorId
        author {
          id
          name
          email
        }
        content
        createdAt
        updatedAt
      }
      votes {
        id
        userId
      }
      createdAt
      updatedAt
    }
  }
`;
