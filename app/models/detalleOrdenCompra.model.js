// models/detalleOrdenCompra.model.js

const DetalleOrdenCompra = (sequelize, Sequelize) => {
  return sequelize.define("detalles_orden_compra", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: Sequelize.STRING(255)
    },
    cantidad: {
      type: Sequelize.INTEGER
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2)
    },
    montouni: {
      type: Sequelize.DECIMAL(10, 2)
    }
  });
};

export default DetalleOrdenCompra;
