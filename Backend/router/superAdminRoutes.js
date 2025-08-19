import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {deleteAuctionItem,deletePaymentProof,fetchAllUsers,getAllPaymentProofs,getPaymentProofDetail,monthlyRevenue,updateProofStatus,} from "../controllers/superAdminController.js";

const router = express.Router();

router.delete("/auctionitem/delete/:id",isAuthenticated,isAuthorized("Admin"),deleteAuctionItem);

router.get("/paymentproofs/getall",isAuthenticated,isAuthorized("Admin"),getAllPaymentProofs);

router.get("/paymentproof/:id",isAuthenticated,isAuthorized("Admin"),getPaymentProofDetail);

router.put("/paymentproof/status/update/:id",isAuthenticated,isAuthorized("Admin"),updateProofStatus);

router.delete("/paymentproof/delete/:id",isAuthenticated,isAuthorized("Admin"),deletePaymentProof);

router.get("/users/getall",isAuthenticated,isAuthorized("Admin"),fetchAllUsers);

router.get("/monthlyincome",isAuthenticated,isAuthorized("Admin"),monthlyRevenue);

export default router;