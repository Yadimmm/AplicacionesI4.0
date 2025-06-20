import { Router } from "express";
import { login, getTime, updateTime, getAllUsers, getUserName, createUser, updateUser, deleteUser } from "../controllers/auth.controller";
import { Request, Response, NextFunction } from "express";

const router = Router();

// Login de usuario
router.post('/login-user', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (err) {
    next(err);
  }
});
//router.post('/login-user', login); //Ruta del controlador/endpoint

// Obtener TTL del token
router.get('/getTime/:userId', async (req, res, next) => {
  try {
    await getTime(req, res);
  } catch (err) {
    next(err);
  }
});
//router.get('/getTime/:userId', getTime); //despues de los dos puntos es parametro

// Actualizar TTL del token
router.put('/updateTime', async (req, res, next) => {
  try {
    await updateTime(req, res);
  } catch (err) {
    next(err);
  }
});
//router.put('/updateTime', updateTime);

// Listar todos los usuarios
router.get('/user', (req, res, next) => {
  getAllUsers(req, res).catch(next);
});
//router.get('/user',getAllUsers);

// Obtener usuario por username
router.get('/user/:username', (req, res, next) => {
  getUserName(req, res).catch(next);
});
//router.get('/user/:username',getUserName);

// Crear nuevo usuario
router.post('/user', (req, res, next) => {
  createUser(req, res).catch(next);
});
//router.post('/user',createUser);

// Actualizar usuario (baja lógica y cambios)
router.patch('/user/:id', (req, res, next) => {
  updateUser(req, res).catch(next);
});
//router.patch('/user/:id',updateUser);

// Baja lógica de usuario
router.delete('/user/:id', (req, res, next) => {
  deleteUser(req, res).catch(next);
});
//router.delete('/user/:id',deleteUser);
export default router;