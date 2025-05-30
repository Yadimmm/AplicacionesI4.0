import mongoose, { Document, Types, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export  interface IUser extends Document{
_id:Types.ObjectId;
username:string;
password:string;
role:string;
email:string; //Tres puntos a implementar estatus y fechas
status:boolean;
createDate:Date;
deleteDate:Date;
}
const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
         type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    deleteDate:{
        type:Date
    }
});

userSchema.pre('save', async function (next){
    const user = this as IUser;

    if (!user.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10); //valor aleatorio que se añade a la contraseña antes de hashearla
        user.password = await bcrypt.hash(user.password, salt); //Toma esta contraseña y el valor aleatorio los combina y genera un hash seguro."
        next();
    }catch (error){
        next(error as mongoose.CallbackError);
    }
});

export const User=model<IUser>('User',userSchema,'user');