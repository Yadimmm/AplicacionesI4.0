import jwt from 'jsonwebtoken';

// Constante corregida
const ACCESS_SECRET = 'secret12345utd';

// Función para generar el token
export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { userId },
        ACCESS_SECRET,
        {
            expiresIn: '15m'  // Tiempo de expiración correcto
        }
    );
};

// Ejemplo de uso
const userId = 'abc123';
const accessToken = generateAccessToken(userId);

console.log('Access Token:', accessToken);