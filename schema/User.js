import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  User:String,
  age:String,
  userid: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("Url", UserSchema);
export default User;
