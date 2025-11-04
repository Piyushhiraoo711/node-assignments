import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate : {
        validator : function(v){
          return /^[a-zA-Z0-9]+$/.test(v);
        },
        message : props => `${props.value} is not a valid username! Must be alphanumeric`
      }
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate : {
        validator : async function (v) {
          const user = await mongoose.models.User.findOne({email : v});
          return !user
        },
        message : props => `${props.value} is alredy registered.`
      }
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
