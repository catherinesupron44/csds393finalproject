/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInformation = /* GraphQL */ `
  query GetUserInformation($id: ID!) {
    getUserInformation(id: $id) {
      id
      name
      groupId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserInformations = /* GraphQL */ `
  query ListUserInformations(
    $filter: ModelUserInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInformations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        groupId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
