import { response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not Authenticated");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
    if (err) return res.json("Token is invalid");
    req.admin = admin;
    next();
  });
};
