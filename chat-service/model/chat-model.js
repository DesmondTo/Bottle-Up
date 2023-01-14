import mongoose from 'mongoose';
var Schema = mongoose.Schema;
let ChatModelSchema = new Schema({
  bottleID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ChatModel', ChatModelSchema);
