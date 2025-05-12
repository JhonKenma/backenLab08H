//models/index.js
import Sequelize from "sequelize";
import config from "../config/db.config.js";
import User from "./user.model.js";
import Role from "./role.model.js";
import OrdenCompra from "./ordenCompra.model.js";
import DetalleOrdenCompra from "./detalleOrdenCompra.model.js";

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User(sequelize, Sequelize);
db.role = Role(sequelize, Sequelize);
db.ordenCompra = OrdenCompra(sequelize, Sequelize);
db.detalleOrdenCompra = DetalleOrdenCompra(sequelize, Sequelize);

// Relaciones N:M entre Usuario y Rol
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// Relación 1:N entre User y OrdenCompra
db.user.hasMany(db.ordenCompra, {
  foreignKey: "userId",
  as: "ordenes"
});
// Relación inversa
db.ordenCompra.belongsTo(db.user, {
  foreignKey: "userId",
  as: "creador"
});
// Relación 1:N entre OrdenCompra y DetalleOrdenCompra
db.ordenCompra.hasMany(db.detalleOrdenCompra, {
  foreignKey: "NroOrdenC",
  as: "detalles"
});
// Relación inversa
db.detalleOrdenCompra.belongsTo(db.ordenCompra, {
  foreignKey: "NroOrdenC",
  as: "orden"
});

db.ROLES = ["user", "admin", "moderator"];

export default db;
