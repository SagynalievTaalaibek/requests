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
    const { status, date, from, to } = req.query;

    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (date) {
      filter.createdAt = {
        $gte: new Date(date + 'T00:00:00.000Z'),
        $lte: new Date(date + 'T23:59:59.999Z'),
      };
    }

    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from as string),
        $lte: new Date(to as string),
      };
    }

    const requests = await Requests.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (e) {
    next(e);
  }
});

requestRouter.patch('/:id', async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { start, complete, cancel } = req.query;

    const request = await Requests.findById(requestId);

    if (!request) {
      res.status(404).json({ error: 'Not Found Request' });
    }

    if (start && request) {
      request.status = 'in_progress';
      await request.save();

      res.send(request);
    }

    if (complete && request) {
      const { solutionText } = req.body;

      if (!solutionText || solutionText.trim().length === 0) {
        res.status(404).json({ error: 'No Solution Text!' });
      }

      request.solutionText = solutionText;
      request.status = 'completed';
      await request.save();

      res.send(request);
    }

    if (cancel && request) {
      const { cancelReason } = req.body;

      if (!cancelReason || cancelReason.trim().length === 0) {
        res.status(404).json({ error: 'No Cancel Text!' });
      }

      request.cancelReason = cancelReason;
      request.status = 'cancelled';
      await request.save();

      res.send(request);
    }

    res.status(404).json({ error: 'No such parameter' });
  } catch (e) {
    next(e);
  }
});

export default requestRouter;
