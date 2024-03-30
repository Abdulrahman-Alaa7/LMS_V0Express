import express from "express";
import {
  creatOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, creatOrder);

orderRouter.get(
  "/get-all-orders",
  isAuthenticated,
  authorizeRole("manger"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;
