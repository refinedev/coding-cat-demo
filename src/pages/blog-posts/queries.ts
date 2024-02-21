import gql from "graphql-tag";

export const POSTS_LIST_QUERY = gql`
  query PostsList(
    $paging: OffsetPaging!
    $filter: BlogPostFilter
    $sorting: [BlogPostSort!]!
  ) {
    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        title
        status
        category {
          id
          title
        }
        createdAt
      }
      totalCount
    }
  }
`;

export const CATEGORIES_LIST_QUERY = gql`
  query PostsList(
    $paging: OffsetPaging!
    $filter: CategoryFilter
    $sorting: [CategorySort!]!
  ) {
    categories(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        title
      }
      totalCount
    }
  }
`;

export const POST_EDIT_MUTATION = gql`
  mutation PostEdit($input: UpdateOneBlogPostInput!) {
    updateOneBlogPost(input: $input) {
      id
      title
      status
      category {
        id
        title
      }
      categoryId
    }
  }
`;
