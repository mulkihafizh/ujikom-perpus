import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Librarian"],
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(async function (password) {
    this.encrypted_password = password;
    this.salt = crypto.randomBytes(16).toString("hex");
    this.encrypted_password = await userSchema.methods.securePassword(password);
  })
  .get(function (password) {
    return this.encrypted_password;
  });

userSchema.methods = {
  authenticate: function (plainpassword: string) {
    return this.securePassword(plainpassword) === this.encrypted_password;
  },

  securePassword: function (plainpassword: string) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", "4r34l1y53cr37")
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
};

export const User = mongoose.model("User", userSchema);
