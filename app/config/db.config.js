// app/config/db.config.js
export default {
  HOST: "dpg-d0gn2p3e5dus73agqsog-a.oregon-postgres.render.com", // o usa el hostname de Render
  USER: "baselab08_user", // usuario de PostgreSQL
  PASSWORD: "a33VCjV07m7h9KVYy9t31Gex011QYc34",
  DB: "baselab08",
  dialect: "postgres",
  port: 5432, // puerto estándar de PostgreSQL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
