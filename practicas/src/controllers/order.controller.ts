import { Request, Response } from "express";
import { Order } from "../models/Order";

// Crear una orden (calcular subtotal y total antes de guardar)
export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newOrder = new Order();

    // Asignar todos los campos del request body
    Object.assign(newOrder, payload);

    // Validar que haya productos
    if (!Array.isArray(newOrder.products) || newOrder.products.length === 0) {
      return res.status(400).json({ message: "La orden debe tener al menos un producto." });
    }

    // Calcular subtotal y total
    newOrder.subtotal = newOrder.products.reduce((acc, prod) => {
      const price    = typeof prod.price    === "number" ? prod.price    : Number(prod.price)    || 0;
      const quantity = typeof prod.quantity === "number" ? prod.quantity : Number(prod.quantity) || 0;
      return acc + price * quantity;
    }, 0);
    newOrder.total = newOrder.subtotal; // aquí podrías añadir impuestos/envío si fuese necesario

    // Guardar y responder
    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);

  } catch (err: any) {
    console.error("Error al crear orden:", err);
    return res.status(500).json({
      message: "Error interno al crear la orden",
      error: err.message
    });
  }
};

// Baja lógica: cambiar status a "CANCELLED" en lugar de borrar
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    order.status = "CANCELLED"; // o "DELETED"
    await order.save();
    return res.json({ message: "Orden cancelada (baja lógica).", order });

  } catch (err: any) {
    console.error("Error al cancelar orden:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Reasignar usuario de la orden
export const changeOrderUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Debes enviar un userId válido." });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    order.userId = userId;
    await order.save();
    return res.json({ message: "Usuario de la orden actualizado.", order });

  } catch (err: any) {
    console.error("Error al cambiar usuario de orden:", err);
    return res.status(500).json({ message: err.message });
  }
};
//Lista de las ordenes
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    return res.json(orders);
  } catch (err: any) {
    console.error("Error al listar órdenes:", err);
    return res.status(500).json({ message: err.message });
  }
};
//Orden por ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada." });
    return res.json(order);
  } catch (err: any) {
    console.error("Error al obtener orden:", err);
    return res.status(500).json({ message: err.message });
  }
};
//Marcar orden como PAGADA
export const payOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada." });

    order.status = "PAID"; // o "PAGADA"
    await order.save();
    return res.json({ message: "Orden marcada como PAGADA.", order });
  } catch (err: any) {
    console.error("Error al pagar orden:", err);
    return res.status(500).json({ message: err.message });
  }
};