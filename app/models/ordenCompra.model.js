// models/ordenCompra.model.js

const OrdenCompra = (sequelize, Sequelize) => {
  return sequelize.define("ordenes_compra", {
    NroOrdenC: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaEmision: {
      type: Sequelize.DATE
    },
    Situacion: {
      type: Sequelize.STRING(50)
    },
    Total: {
      type: Sequelize.DECIMAL(10, 2)
    },
    CodLab: {
      type: Sequelize.INTEGER
    },
    NrofacturaProv: {
      type: Sequelize.STRING(50)
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
};

export default OrdenCompra;
