import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let BottleModelSchema = new Schema({
  bottleID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.model('BottleModel', BottleModelSchema);
