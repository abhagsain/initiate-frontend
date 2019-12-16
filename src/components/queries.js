import { gql } from "apollo-boost";
const AUTH_RES = gql`
  fragment RES on AuthResponse {
    error
    input
    message
  }
`;
export const GET_HOMEPAGE_POSTS = gql`
  query GET_HOMEPAGE_POSTS {
    posts {
      id
      title
      body
      author {
        email
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      user {
        id
        email
      }
      token
      res {
        error
        input
        message
      }
    }
  }
`;
