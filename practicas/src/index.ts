import express from 'express';
import morgan from 'morgan';
import authRoute from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from "./routes/product.routes";
import connectDBMongo from './config/db';

const app = express(); //inicializar el servidor de express
const PORT =3000; //crear una variable para asignar el valor del puerto que se va a utilizar

//todo lo que reciba es de tipo json
app.use(express.json()) 
app.use(morgan('dev')); //mostrar logs de las peticiones

app.use('/api/auth', authRoute); //Ruta principal
app.use('/api/orders', orderRoutes); 
app.use("/api/products", productRoutes);

connectDBMongo().then(()=>{
    app.listen(PORT, () => {
        console.log(`El servidor funciona en el puerto:${PORT}`);
        console.log(`El servidor esta funcionando,PORT`);

    })
});
