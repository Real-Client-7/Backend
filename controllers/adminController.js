import Model from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import asyncHandler from 'express-async-handler';
dotenv.config();

// this function is to fetch all the admins
export function getAdmin(req, res, next) {
  Model.find({})
    .then((response) => {
      res.status(200).send({ status: 200, response });
    })
    .catch((err) => {
      next(err);
    });
}

// this function is to create a new admin
export function Add(req, res, next) {
  const model = new Model(req.body);
  model
    .save()
    .then((data) => {
      return res.status(201).send({ status: 201, data });
    })
    .catch((err) => {
      next(err);
    });
}

// this function is to get one admin by id
export function getAdminById(req, res, next) {
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Admin not found" });
      } else {
        res.status(200).send({ status: 200, response });
      }
    })
    .catch((err) => {
      next(err);

    });
}

// this function is to update one admin by id
export function updateAdmin(req, res, next) {
  let { id } = req.params;
  const NameB = req.body.username;
  const passwordB = req.body.password;
  Model.findById({_id:id}).then((model)=>{
    if(!model) return res.status(404).send({status:404, message:"Admin not found"});
  
  if (NameB && passwordB) {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(passwordB, salt))
      .then((hashPassword) =>
        Model.updateMany(
          { _id: id },
          {
            $set: { username: NameB },
          },
          { $set: { password: hashPassword } }
        )
      )
      .then((model) => {
        res.status(200).send({ status: 200, message: "success" });
      })
      .catch((err) => next(err));
  }
  if (NameB && !passwordB) {
    Model.updateOne({ _id: id }, { $set: { username: NameB } })
      .then((model) => {
        res
          .status(200)
          .send({ status: 200, message: "edit name successfully" });
      })
      .catch((err) => next(err));
  }
  if (!NameB && passwordB) {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(passwordB, salt))
      .then((hashPassword) =>
        Model.updateOne({ _id: id }, { $set: { password: hashPassword } })
      )
      .then((model) => {
        res
          .status(200)
          .send({ status: 200, message: "edit password successfully" });
      })
      .catch((err) => next(err));
  }})
}

export function deleteAdmin(req, res, next) {
  let { id } = req.params;
  console.log(id);
  Model.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: 404, message: "Admin not found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "Admin deleted successfully" });
      }
    })
    .catch((err) => next(err));
}

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let adminExists
  try {
      adminExists = await Model.findOne({ email: email })
  }
  catch (err) {
      return new Error(err);
  }
  if (!email || !password) {
      return res.status(404).json({ message: 'Please enter all fields' })

  }
  if (!adminExists) {
      return res.status(404).json({ message: 'Admin not found' })
  }
  const isPassword = bcrypt.compareSync(password, adminExists.password);
  if (!isPassword) {
      return res.status(404).json({ message: 'Incorrect  Password' })
  }

  const token = jwt.sign({ id: adminExists._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });


  res.cookie("auth-token", token, {
      path: '/',
      maxAge:900000,
      httpOnly: true,
      sameSite: 'lax'
  });


  return res.status(200).json({ message: 'Successfuly login', admin: adminExists, token });
})


export function logout(req, res, next) {
  res
    .clearCookie("auth")
    .status(200)
    .send({ status: 200, message: "logged out successfully" });
}

