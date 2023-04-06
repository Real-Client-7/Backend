import express from "express";
const router = express.Router();
import {
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  Add,
  login,
  logout,
} from "../controllers/adminController.js";
import verifyToken from "../middleware/authFun.js";

router.get("/", verifyToken, getAdmin);

router.get("/:id", verifyToken, getAdminById);

router.put("/:id", verifyToken, updateAdmin);

router.delete("/:id", verifyToken, deleteAdmin);

router.post("/add", verifyToken, Add);

router.post("/login", login);

router.post("/logout", logout);

router.post("/token", verifyToken,(req,res)=>{
  if(req.user){
    return res.status(200).json({
      status:200,
      message:"You are logged in"
    })
  }
})

export default router;
