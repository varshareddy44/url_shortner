import {Router} from 'express';
import {doNothingController, printHelloWorld} from '../controllers/hwController.js';

const hwRouter = Router();

hwRouter.get('/', doNothingController);
hwRouter.get('/print', printHelloWorld);
hwRouter.post('/ ', printHelloWorld);

hwRouter.get("/:userId",getDataFromFrontend);


export default hwRouter;