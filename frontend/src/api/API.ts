/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGitHubActionWorkflowDispatchResponse = {
  __typename: "CreateGitHubActionWorkflowDispatchResponse",
  total_count: number,
};

export type InvokePHPLambdaResponse = {
  __typename: "InvokePHPLambdaResponse",
  statusCode: number,
};

export type CreateGitHubActionWorkflowDispatchQueryVariables = {
  owner: string,
  repo: string,
  workflowID: string,
  ref: string,
};

export type CreateGitHubActionWorkflowDispatchQuery = {
  createGitHubActionWorkflowDispatch?:  {
    __typename: "CreateGitHubActionWorkflowDispatchResponse",
    total_count: number,
  } | null,
};

export type InvokePHPLambdaQueryVariables = {
  key: string,
  value: string,
};

export type InvokePHPLambdaQuery = {
  invokePHPLambda?:  {
    __typename: "InvokePHPLambdaResponse",
    statusCode: number,
  } | null,
};
