/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGitHubActionWorkflowDispatch = /* GraphQL */ `
  query CreateGitHubActionWorkflowDispatch(
    $owner: String!
    $repo: String!
    $workflowID: String!
    $ref: String!
  ) {
    createGitHubActionWorkflowDispatch(
      owner: $owner
      repo: $repo
      workflowID: $workflowID
      ref: $ref
    ) {
      total_count
    }
  }
`;
export const invokePHPLambda = /* GraphQL */ `
  query InvokePHPLambda($key: String!, $value: String!) {
    invokePHPLambda(key: $key, value: $value) {
      statusCode
    }
  }
`;
