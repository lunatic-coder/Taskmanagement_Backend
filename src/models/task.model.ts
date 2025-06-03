import mongoose , {Schema} from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


export const Task = mongoose.model('Task', TaskSchema);