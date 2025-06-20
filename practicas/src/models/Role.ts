import mongoose, { Document, Types, Schema, model } from "mongoose";

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: string;
  type: string;
  status: boolean;
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  }
});

export const Role = model<IRole>("Role", roleSchema, "role");
