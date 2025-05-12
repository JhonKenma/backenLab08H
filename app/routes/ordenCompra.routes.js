// routes/ordenCompra.routes.js

import { authJwt } from "../middleware/index.js";
import * as ordenCompraController from "../controllers/ordenCompra.controller.js";

export default function(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post( // Crear una nueva orden de compra
    "/api/ordenes",
    [authJwt.verifyToken], 
    ordenCompraController.crearOrdenCompra
  );
  app.get(// Listar órdenes de compra del usuario autenticado
    "/api/ordenes",
    [authJwt.verifyToken], 
    ordenCompraController.listarOrdenesPorUsuario
  );
  app.get(// Obtener una orden de compra por ID
    "/api/ordenes/:id",
    [authJwt.verifyToken], 
    ordenCompraController.obtenerOrdenPorId
  );
  app.put(// Actualizar una orden
    "/api/ordenes/:id",
    [authJwt.verifyToken],
    ordenCompraController.actualizarOrdenCompra
  );
  app.delete(// Eliminar una orden
    "/api/ordenes/:id",
    [authJwt.verifyToken],
    ordenCompraController.eliminarOrdenCompra
  );

}
