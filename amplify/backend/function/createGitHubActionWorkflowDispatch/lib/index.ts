import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { Octokit } from "@octokit/rest";

const WorkflowStatus = {
	Queued: "queued",
	InProgress: "in_progress",
	Complete: "complated",
}

const SECRET_ENV_NAMES = [
	"GITHUB_ACCESS_TOKEN"
]

type EventValueType = {
	owner: string;
	repo: string;
	workflowID: string;
	ref: string;
}

type EventType<V = any> = {
	arguments: V;
};

type WorkflowDispatch = {
	id: number;
}

export const handler: Handler<EventType<EventValueType>, object> = async (event, context, callback) => {
	const ssm = new AWS.SSM();
	const { Parameters } = await ssm.getParameters({
		Names: SECRET_ENV_NAMES.map((name) => process.env[name] ?? name),
		WithDecryption: true
	}).promise();

	if (Parameters == null) {
		return {};
	}

	const [githubAccessToken] = Parameters;

	const octokit = new Octokit({
		auth: githubAccessToken.Value
	});

	await octokit.actions.createWorkflowDispatch({
		owner: event.arguments.owner,
		repo: event.arguments.repo,
		workflow_id: event.arguments.workflowID,
		ref: event.arguments.ref,
		inputs: { value: `${context.functionName} #${context.functionVersion} (#${context.awsRequestId})` }
	})

	const res = await octokit.actions.listWorkflowRuns({
		owner: event.arguments.owner,
		repo: event.arguments.repo,
		workflow_id: event.arguments.workflowID,
		per_page: 5,
	})

	return res.data;
};

