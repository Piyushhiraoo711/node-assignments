import mongoose from "mongoose";

// function isPasswordStrong(password) {
//   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//     password
//   );
// }

const userSchema = new mongoose.Schema(
  {
    firstName: {
      // type: String,
      // required: [true, "First Name is required"],
      // validate: {
      //   validator: (v) => /^[a-zA-Z]+$/.test(v),
      //   message: "First name must contain only letters.",
      // },
    },
    lastName: {
      // type: String,
      // required: [true, "Last Name is required"],
      // validate: {
      //   validator: (v) => /^[a-zA-Z]+$/.test(v),
      //   message: "Last name must contain only letters.",
      // },
    },
    email: {
      // type: String,
      // required: [true, "Email is required"],
      // unique: true,
      // lowercase: true,
      // trim: true,
      // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      // validate: {
      //   validator: async function (value) {
      //     const user = await mongoose.models.users.findOne({ email: value });
      //     return !user;
      //   },
      //   message: (props) => `${props.value} is alredy registered.`,
      // },
    },
    password: {
      // type: String,
      // required: [true, "Password is required"],
      // validate: {
      //   validator: isPasswordStrong,
      //   message:
      //     "Password must be at least 8 characters long and contain at least one number.",
      // },
    },
    phone: {},
    address: {},
    role: {},
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
export default User;
