import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import ordenRoutes from "./app/routes/ordenCompra.routes.js";

const app = express();

// Opciones CORS
// Configuración de CORS más flexible
var corsOptions = {
  origin: function (origin, callback) {
    // Lista de orígenes permitidos
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'https://tudominio.com'];
    
    // Permitir solicitudes sin origen (como las aplicaciones móviles o herramientas de API)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Parseamos requests de content-type - application/json
app.use(express.json());

// Parseamos requests de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación de autenticación con JWT." });
});

// Rutas
authRoutes(app);
userRoutes(app);
ordenRoutes(app);
// Puerto
const PORT = process.env.PORT || 8080;

// Sincronizar base de datos
// En desarrollo: db.sequelize.sync({ force: true }) para eliminar y recrear tablas
db.sequelize.sync().then(() => {
  console.log("Base de datos sincronizada.");
  
  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}.`);
  });
});