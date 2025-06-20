import { Request, Response } from "express";
import { Product } from "../models/Product";

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const prod = new Product(req.body);
    const saved = await prod.save();
    return res.status(201).json(saved);
  } catch (err: any) {
    console.error("Error al crear producto:", err);
    return res.status(400).json({ message: err.message });
  }
};

// Listar todos los productos
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const list = await Product.find({ status: true }); // solo activos
    return res.json(list);
  } catch (err: any) {
    console.error("Error al obtener productos:", err);
    return res.status(500).json({ message: err.message });
  }
};
// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const prod = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    if (!prod) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    return res.json({ message: "Producto actualizado.", prod });
  } catch (err: any) {
    console.error("Error al actualizar producto:", err);
    return res.status(500).json({ message: err.message });
  }
};// Baja lógica de producto tengo que marcar status = false 
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prod = await Product.findById(id);
    if (!prod) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    prod.status = false;
    prod.deleteDate = new Date();
    await prod.save();
    return res.json({ message: "Producto dado de baja (status=false).", prod });
  } catch (err: any) {
    console.error("Error al dar de baja producto:", err);
    return res.status(500).json({ message: err.message });
  }
};