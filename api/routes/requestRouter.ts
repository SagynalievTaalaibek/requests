import { Router } from 'express';
import Requests from '../models/Requests';

const requestRouter = Router();

requestRouter.post('/', async (req, res, next) => {
  try {
    const newRequest = new Requests({
      title: req.body.title,
      description: req.body.description,
    });

    await newRequest.save();
    res.send(newRequest);
  } catch (e) {
    next(e);
  }
});

requestRouter.get('/', async (req, res, next) => {
  try {
    const requests = await Requests.find();
    res.send(requests);
  } catch (e) {
    next(e);
  }
});

export default requestRouter;
