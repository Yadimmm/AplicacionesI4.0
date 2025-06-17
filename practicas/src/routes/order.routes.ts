import { Router } from 'express';
import {createOrder,deleteOrder,changeOrderUser,getOrders,getOrderById,payOrder} from '../controllers/order.controller';
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";


const router = Router();

router.get('/', (req, res, next) => {
  getOrders(req, res).catch(next);
});
//Ver todas las ordenes
//router.get('/',getOrders);

// Ver orden por ID
router.get('/:id', (req, res, next) => {
  getOrderById(req, res).catch(next);
});
// Ver orden por ID
//router.get('/:id',getOrderById);

router.post(
  '/',
  // middleware wrapper que encaja con (req, res, next)
  (req, res, next) => {
    createOrder(req, res).catch(next);
  }
);
// Crear nueva orden opcion pero con error  
//router.post('/', createOrder);

router.delete(
  '/:id',
  (req, res, next) => {
    deleteOrder(req, res).catch(next);
  }
);
// Baja lógica: cancelar orden
//router.delete('/:id', deleteOrder);

router.patch('/:id/user', (req, res, next) => {
  changeOrderUser(req, res).catch(next);
});
// Reasignar usuario de la orden
//router.patch('/:id/user', changeOrderUser);

router.patch('/:id/pay', (req, res, next) => {
  payOrder(req, res).catch(next);
});
//Pagar orden
//router.patch('/:id/pay',payOrder);
export default router;