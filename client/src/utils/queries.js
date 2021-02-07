import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      saveBook {
        _id
        title
        description
        authors
        bookId
        image
        link
      }
      
    }
  }
`;