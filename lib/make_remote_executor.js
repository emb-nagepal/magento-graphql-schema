//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const { fetch } = require('cross-fetch');
const { print } = require('graphql');
const https = require('https');
//import { request, gql } from 'graphql-request'

const {request, GraphQLClient } = require('graphql-request');

// Builds a remote schema executor function,
// customize any way that you need (auth, headers, etc).
// Expects to receive an object with "document" and "variable" params,
// and asynchronously returns a JSON response from the remote.
module.exports = function makeRemoteExecutor(url) {
  return async ({ document, variables, context }) => {
    const query = typeof document === 'string' ? document : print(document);
      const agentSetup = url.indexOf('https') >= 0 ? new https.Agent({
        rejectUnauthorized: false,
      }) : undefined;
    const fetchResult = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': context.authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      agent: agentSetup,
    }); 
    return fetchResult.json();
  };
};


/*
module.exports = function makeRemoteExecutor(url) {
  return async ({ document, variables, context }) => {
    const query = typeof document === 'string' ? document : print(document);
    
   // const fetchResult = await request(url, query, variables);
    
   const crossFetch = require('fetch-cookie')(fetch)
  const graphQLClient = new GraphQLClient(url, { crossFetch })
 

  const data = await graphQLClient.rawRequest(query, variables)
  return data;
};

};

*/

//request('https://api.graph.cool/simple/v1/movies', query).then((data) => data.json())