import connect from 'connect';
import http from 'http';
import bodyParser from 'body-parser';
import middleware from './middleware';
import getPost from './actions/getPost';
import listPosts from './actions/listPosts';
import fail from './actions/fail';
import dashboard from './actions/dashboard';
import temperatureApi from './services/temperatureApi';

const server = connect();

server.use(bodyParser.json())

const app = middleware({
  context: {
    appName: 'demo',
    temperatureApi: temperatureApi('http://example.com/temperature')
  },
  routes: [
    {
      name: 'listPosts',
      path: '/posts',
      method: 'get',
      handler: listPosts
    },
    {
      name: 'getPost',
      path: '/posts/:id',
      method: 'get',
      handler: getPost
    },
    {
      name: 'fail',
      path: '/fail',
      method: 'get',
      handler: fail
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      method: 'get',
      handler: dashboard
    }
  ]
});


server.use(app);



//create node.js http server and listen on port
http.createServer(server).listen(3000);
