import { model, Schema } from 'mongoose';

const RequestsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'completed', 'cancelled'],
      default: 'new',
      required: true,
    },
    solutionText: {
      type: String,
      default: null,
    },
    cancelReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Requests = model('Requests', RequestsSchema);
export default Requests;
