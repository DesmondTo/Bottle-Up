import mongoose from 'mongoose';
var Schema = mongoose.Schema;
let BottleQueueModelSchema = new Schema({
  bottleID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.model('BottleQueueModel', BottleQueueModelSchema);
