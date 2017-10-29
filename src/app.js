import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './server/routes';
import * as firebase from 'firebase';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
routes(app);

var config = require('./config.json');
let firebaseApp = firebase.initializeApp(config);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8082, () => {
  console.log('Started');
});

export {
  firebaseApp
}
