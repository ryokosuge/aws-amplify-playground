# AWS Amplify Playground

```
$ amplify init
```

色々答えて

```
$ amplify push
```

でok

## project構成

- package.json
	- scriptsから `yarn workspace front dev` をkickできる
- front
	- Next.jsで作られたproject directory
		- tsconfigはrootのtsconfigを継承
		- eslintはrootのeslintを継承
- amplify
	- api
		- AppSync（GraphQL）
		- Functionを叩けるようにする
	- function
		- functionごとにディレクトリ
- lambda
	- phplambda
		- 適当にオウム返しするlambdaをAWS SAMで作成

## front

ただのNext.jsのプロジェクト、特に何もしていない

`<button />` を用意して、clickしたらAmplify APIをcallするようにだけ組んだ

## Amplify

FunctionのコードもTypescriptで書きたかった

`amplify/backend/function/createGitHubActionWorkflowDispatch`が今回新しく作ったFunction

### createGitHubActionWorkflowDispatch

```sh
$ tree -L 2 amplify/backend/function/createGitHubActionWorkflowDispatch/
amplify/backend/function/createGitHubActionWorkflowDispatch/
├── createGitHubActionWorkflowDispatch-cloudformation-template.json
├── dist
│   └── latest-build.zip
├── lib
│   └── index.ts
├── package.json
├── parameters.json
├── res
│   └── event.json
├── src
└── tsconfig.json
```

今回は `lib` 配下にTypescriptファイルを配置して、functionをbuildするときに `tsc` を実行して `src` 配下に `*.js`ファイルを展開するようにした

scriptはrootディレクトリのpackage.json

```sh
$ cat package.json
{
	...
  "scripts": {
		...
    "amplify:createGitHubActionWorkflowDispatch": "cd amplify/backend/function/createGitHubActionWorkflowDispatch && rm -rf src && mkdir -p src && cp package.json src/ && cd src && npm install --production && rm package.json package-lock.json && cd ../ && yarn tsc && cd ../../../../"
  },
	...
}
```

やってることの解説

```sh
// buildするディレクトリまで移動
cd amplify/backend/function/createGitHubActionWorkflowDispatch

// 成果物を配置するsrcディレクトリを初期化
rm -rf src
mkdir -p src

// package.jsonをsrc配下にコピー
cp package.json src/

// srcディレクトリ内で npm install --production
// 必要ないやつ（devDependencies）をinstallすると容量を切迫してしまうので
// --productionでdependenciesのみをinstallする
cd src && npm install --production

// package.json & package-lock.jsonがsrc内にあると
// AWS Amplify Functionのbuild時に `npm install` が実行されてしまうので削除
rm package.json package-lock.json

// TypeScriptをbuildする
cd ../ && yarn tsc

// プロジェクトのrootに戻る
cd ../../../../
```

これで `src` ディレクトリが AWS Lambdaにuploadされるようになる

このFunctionの中身は `@octokit/rest` を使って AWS SSMに保存されてる GitHub Personal Access Tokenを使って GitHub Actionsのworkflow_dispatchをkickしてみてる感じ

叩かれてるのはこのrepository内のやつ

[ryokosuge/github-actions-workflow-dispatch](https://github.com/ryokosuge/github-actions-workflow-dispatch)

## Lambda

AWS SAMで色々作成

https://aws.amazon.com/jp/builders-flash/202107/new-lambda-container-development-4/?awsf.filter-name=*all

これみてやってみた
