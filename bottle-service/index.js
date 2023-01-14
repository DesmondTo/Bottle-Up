import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());
import {
  createBottle,
  findBottle,
  collectBottle,
  throwBottle,
  getUserBottles,
} from './controller/bottle-controller.js';

const router = express.Router();

// Controller will contain all the Bottle-defined Routes
router.get('/', (_, res) => res.send('Hello World from bottle-service'));
router.post('/create', createBottle);
router.get('/find/:username', findBottle);
router.post('/collect', collectBottle);
router.post('/throw', throwBottle);
router.get('/get/:username', getUserBottles);

app.use('/api/bottle', router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
});

app.listen(8001, () => console.log('bottle-service listening on port 8001'));
