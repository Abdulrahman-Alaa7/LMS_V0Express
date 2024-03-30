import { Response, NextFunction } from "express";
import oredrModel from "../models/order.model";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";

// Create new order
export const createNewOrder = CatchAsyncErrors(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await oredrModel.create(data);

    res.status(200).json({
      success: true,
      order,
    });
  }
);

// Get all order -- only admin
export const getAllOrdersService = async (res: Response) => {
  const orders = await oredrModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
