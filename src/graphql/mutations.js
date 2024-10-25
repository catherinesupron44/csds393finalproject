/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserInformation = /* GraphQL */ `
  mutation CreateUserInformation(
    $input: CreateUserInformationInput!
    $condition: ModelUserInformationConditionInput
  ) {
    createUserInformation(input: $input, condition: $condition) {
      id
      name
      groupId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserInformation = /* GraphQL */ `
  mutation UpdateUserInformation(
    $input: UpdateUserInformationInput!
    $condition: ModelUserInformationConditionInput
  ) {
    updateUserInformation(input: $input, condition: $condition) {
      id
      name
      groupId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserInformation = /* GraphQL */ `
  mutation DeleteUserInformation(
    $input: DeleteUserInformationInput!
    $condition: ModelUserInformationConditionInput
  ) {
    deleteUserInformation(input: $input, condition: $condition) {
      id
      name
      groupId
      createdAt
      updatedAt
      __typename
    }
  }
`;
