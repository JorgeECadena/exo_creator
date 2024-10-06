export type AmplifyDependentResourcesAttributes = {
  "api": {
    "api": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "getPlanetInfo": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "nodeApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "apifunc": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "getExoInfo": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "nodeFunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}