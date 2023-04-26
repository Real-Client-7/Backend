import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";
const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,

    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "admin",
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
    versionKey: false,
  }
);
adminSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt) )
    .then((hashPassword) => {
      this.password = hashPassword;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
const Admin = model("Admin", adminSchema);
export default Admin;
