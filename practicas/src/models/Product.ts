import mongoose, { Document, Types, Schema, model } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  qty: number;
  status: boolean;
  price: number;
  createDate: Date;
  deleteDate?: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  qty: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  deleteDate: {
    type: Date
  }
});

export const Product = model<IProduct>("Product", productSchema, "product");
