import mongoose, { Document, Types, Schema, model } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  subtotal?: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  userId: string;
  total: number;
  subtotal: number;
  status: string;
  createDate: Date;
  updateDate: Date;
  products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true
    },
    subtotal: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    products: {
      type: [orderProductSchema],
      required: true,
      validate: [
        (arr: IOrderProduct[]) => arr.length > 0,
        "Debe contener al menos un producto"
      ]
    },
    status: {
      type: String,
      default: "PENDING",
      trim: true
    },
    createDate: {
      type: Date,
      default: Date.now
    },
    updateDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: false }
);

orderSchema.pre<IOrder>("save", function (next) {
  let sum = 0;
  this.products.forEach((p) => {
    p.subtotal = p.price * p.quantity;  // calculamos y asignamos
    sum += p.subtotal;
  });
  this.subtotal = sum;
  this.total = sum;
  this.updateDate = new Date();
  next();
});

export const Order = model<IOrder>("Order", orderSchema, "order");