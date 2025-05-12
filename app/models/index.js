import Sequelize from "sequelize";
import config from "../config/db.config.js";
import User from "./user.model.js";
import Role from "./role.model.js";
import OrdenCompra from "./ordenCompra.model.js";
import DetalleOrdenCompra from "./detalleOrdenCompra.model.js";

// Configurar Sequelize con SSL
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,
    dialectOptions: config.dialectOptions, // ⚠️ Asegura la conexión SSL
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

db.ordenCompra.belongsTo(db.user, {
  foreignKey: "userId",
  as: "creador"
});

// Relación 1:N entre OrdenCompra y DetalleOrdenCompra
db.ordenCompra.hasMany(db.detalleOrdenCompra, {
  foreignKey: "NroOrdenC",
  as: "detalles"
});

db.detalleOrdenCompra.belongsTo(db.ordenCompra, {
  foreignKey: "NroOrdenC",
  as: "orden"
});

db.ROLES = ["user", "admin", "moderator"];

export default db;
