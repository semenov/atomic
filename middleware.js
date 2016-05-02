import Router from 'routr';
import isPromise from 'is-promise';
import Response from './response';

async function processRoute(route, context) {
  // this will output:
  //   - "view_user" for route.name
  //   - "/user/garfield" for route.url
  //   - {id: "garfield"} for route.params
  //   - {path: "/user/:id", method: "get", foo: { bar: "baz"}} for route.config
  //   - { foo: 'bar' } for route.query
  console.log('[Route found]:', route);

  const handler = route.config.handler;
  const params = route.params;

  const returnValue = handler({params}, context);
  let result;

  if (typeof returnValue == 'string') {
    result = returnValue;
  } else if (isPromise(returnValue)) {
    result = await returnValue;
  }

  return result;
}

export default function({routes, context}) {
  const router = new Router(routes);

  return (req, res) => {
    const url = req.url;
    const method = req.method;
    const route = router.getRoute(url, {method});

    if (route) {
      processRoute(route, context).then(result => {
        console.log({result});
        if (result instanceof Response) {
          res.statusCode = result.statusCode;
          console.log('error', result);
          res.end(result.text);
        } else {
          res.end(result);
        }
      }).catch(e => {
        console.log({e});
        res.end(e);
      });
    } else {
      res.end('Hello from Connect!\n');
    }
  }
}
