import { Router } from "express";
import { login, getTime, updateTime, getAllUsers, getUserName, createUser } from "../controllers/auth.controller";

const router = Router();

router.post('/login-user', login); //Ruta del controlador/endpoint
router.get('/getTime/:userId', getTime); //despues de los dos puntos es parametro
router.put('/updateTime', updateTime);
router.get('/user',getAllUsers);
router.get('/user/:username',getUserName);
router.post('/user',createUser);
export default router;