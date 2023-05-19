import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token 
        user {
            _id
            username
        }
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
             }
        }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: savedBookInput) {
    saveBook(input: $input){
        _id
        username
        email
        bookCount 
        savedBooks {
            authors 
            description
            bookId
            image
            link
            title
        }
    }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount 
        savedBooks {
            authors 
            description
            bookId
            image
            link
            title
        }
    }
}
`;