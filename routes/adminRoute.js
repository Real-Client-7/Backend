import express from "express";
const router = express.Router();
import {
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  Add,
  loginAdmin,
  logout,
} from "../controllers/adminController.js";
import {verifyToken} from "../middleware/authFun.js";

router.get("/", verifyToken, getAdmin);

router.get("/:id", verifyToken, getAdminById);

router.put("/:id", verifyToken, updateAdmin);

router.delete("/:id", verifyToken, deleteAdmin);

router.post("/add", Add);

router.post("/login", loginAdmin);

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
