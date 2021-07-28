import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import Head from 'next/head'
import { CreateGitHubActionWorkflowDispatchQuery, InvokePHPLambdaQuery, InvokePHPLambdaResponse } from '../api/API';
import { createGitHubActionWorkflowDispatch, invokePHPLambda } from '../graphql/queries';
import styles from '../styles/Home.module.css'

export default function Home() {
  const handleClickCreateGitHubActionWorkflowDispatch = async () => {
    const result = (await API.graphql(
      graphqlOperation(
        createGitHubActionWorkflowDispatch,
        {
          owner: "ryokosuge",
          repo: "github-actions-workflow-dispatch",
          workflowID: "workflow_dispatch_action.yaml",
          ref: "main"
        }
      )
    )) as GraphQLResult<CreateGitHubActionWorkflowDispatchQuery>

    if (result.data?.createGitHubActionWorkflowDispatch != null) {
      console.info(result.data.createGitHubActionWorkflowDispatch);
    } else if (result.errors != null) {
      console.error(result.errors);
    }
  };

  const handleClickInvokePHPLambda = async () => {
    const result = (await API.graphql(
      graphqlOperation(
        invokePHPLambda,
        {
          key: "hoge",
          value: "fuga"
        }
      )
    )) as GraphQLResult<InvokePHPLambdaQuery>

    if (result.data?.invokePHPLambda != null) {
      console.dir(result.data.invokePHPLambda);
    } else if (result.errors != null) {
      console.error(result.errors);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <button onClick={handleClickCreateGitHubActionWorkflowDispatch}>Create Github Action Workflow Dispatch</button>
        <button onClick={handleClickInvokePHPLambda}>invoke PHPLambda</button>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
