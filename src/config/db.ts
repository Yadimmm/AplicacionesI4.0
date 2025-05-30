import mongoose from "mongoose";

const connectDBMongo= async ():Promise<void> =>{
    const mongoUri="mongodb://localhost:27017/AppsI4";
    //mongodb://<admin>:<pass>@<servidor>:<puerto>/<db>?authSource=admin"
    //mongodb://<servidor>:<puerto>/<db>"
    //mongodb://localhost:27017/proyecto > cuando no hay usuario y contrasena
    try{
        await mongoose.connect(mongoUri);
        console.log("Conexion a mongo");
    }catch(error){
        console.log("Error conexion a mongo:", error);
    }
}
export default connectDBMongo;