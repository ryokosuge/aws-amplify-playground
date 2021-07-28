import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

type EventValueType = {
	key: string;
	value: string;
}

type EventType<V = any> = {
	arguments: V;
};

type Response = {
	statusCode: number;
	headers: {
		[key: string]: string;
	};
	body: string;
};

export const handler: Handler<EventType<EventValueType>, Response> = async (event, context, callback) => {
	const lambda = new AWS.Lambda();
	const payload = JSON.stringify({ queryStringParameters: event.arguments });
	const value = await lambda.invoke({
		FunctionName: "phplambda-phplambda-QerFWwIgOT9T",
		InvocationType: "RequestResponse",
		Payload: payload,
	}).promise();
	const result = JSON.parse(value.Payload?.toString() ?? "{}") as Response;
	return result;
};

