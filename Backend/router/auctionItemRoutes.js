import {addNewAuctionItem,getAllItems,getAuctionDetails,getMyAuctionItems,removeFromAuction,} from "../controllers/auctionItemController.js";
  import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
  import express from "express";
  import { trackCommissionStatus } from "../middlewares/trackCommission.js";
  
  const router = express.Router();
  
  router.post("/create",isAuthenticated,isAuthorized("Seller"),trackCommissionStatus,addNewAuctionItem);
  
  router.get("/allitems", getAllItems);
  
  router.get("/auction/:id", isAuthenticated, getAuctionDetails);
  
  router.get("/myitems",isAuthenticated,isAuthorized("Seller"),getMyAuctionItems);
  
  router.delete("/delete/:id",isAuthenticated,isAuthorized("Seller"),removeFromAuction);
  
 //router.put("/item/republish/:id",isAuthenticated,isAuthorized("Seller"),republishItem);
  
  export default router;