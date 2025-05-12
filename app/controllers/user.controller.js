// controllers/auth.controller.js

export const allAccess = (req, res) => {
    res.status(200).send("Contenido público.");
  };
  
  export const userBoard = (req, res) => {
    res.status(200).send("Contenido de Usuario.");
  };
  
  export const adminBoard = (req, res) => {
    res.status(200).send("Contenido de Administrador.");
  };
  
  export const moderatorBoard = (req, res) => {
    res.status(200).send("Contenido de Moderador.");
  };