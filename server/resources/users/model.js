import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import uniqueValidator from "mongoose-unique-validator";

// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name field is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "last name field is required"],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email field is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

userSchema.plugin(uniqueValidator, {
  message: "Error, {VALUE} already exist",
});

export const User = mongoose.model("User", userSchema);
