import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import NodeCache from "node-cache";
import dayjs from "dayjs";
import { User } from "../models/User";

// Crear instancia de caché (si no la tienes en otro archivo)
const cache = new NodeCache();

export const login = (req: Request, res: Response) => {
    let name: string = "yo";

    const { username, password } = req.body;

    // Credenciales incorrectas
    if (username !== 'Admin' || password !== '123456789') {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const userId = 'abc123';
    const accessToken = generateAccessToken(userId);

    // Guardar token en caché por 15 minutos
    cache.set(userId, accessToken, 60 * 15);

    return res.json({
        message: 'Login exitoso',
        accessToken
    })
}

export const getTime=(req:Request, res:Response) =>{
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404)
            .json({ message: "Token no encontrado"})
    }

    const now=Date.now();
    const timeToLifeSeconds=Math.floor((ttl-now)/1000);
    const expTime=dayjs(ttl).format('HH:mm:ss')

    return res.json({
        timeToLifeSeconds,
        expTime
    })
}

export const updateTime = (req: Request, res: Response) =>{
    const { userId } = req.body;

    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({ message: 'Token no encontrado o expirado'});
    }
    
    
    const nuevaTTLsegundos = 60 * 15;
    cache.ttl(userId, nuevaTTLsegundos); //MEtodo para actualizar ttl, tiempo de vida

    res.json("Actualizado con exito");
};

export const getAllUsers=async (req:Request,res:Response)=>{
    const userList= await User.find();//Buscar todos los registros

    return res.json({ userList });
}

//Tarea Endpoint que consulte a un usuario pr medio del username
export const getUserName=async (req:Request,res:Response) => {
    try{
        const { username } = req.params;
        const user = await User.findOne({ username});

        if (!user){
            return res.status(404).json({ message:'Usuario no encontrado'});
        }
        res.json(user);
    }catch (error){
        res.status(500).json({ message:'Error al buscar el usuario', error});
    }
};

export const createUser=async(req:Request, res:Response) => {
    try{
        const {username, password, email, role}=req.body;
        const newUser=new User({
            username, //antes es propiedad de la BD, si hay algo despues del punto valor de la variable
            password,
            email,
            role,
            status: true
        });
        const user=await newUser.save();
        return res.json({user});
    }catch(error){
        console.log("Error Ocurrido en el createUser:",error);
        return res.status(426).json({error})
    }
}

//Tarea: Encriptar contrasena al guardar (HASH)