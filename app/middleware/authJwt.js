// middleware/authJwt.js

import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "¡No se proporcionó ningún token!"
    });
  }

  jwt.verify(token, "tu-clave-secreta", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "¡No autorizado!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    res.status(403).send({
      message: "¡Se requiere rol de Administrador!"
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al verificar el rol de Administrador"
    });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    res.status(403).send({
      message: "¡Se requiere rol de Moderador!"
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al verificar el rol de Moderador"
    });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator" || roles[i].name === "admin") {
        next();
        return;
      }
    }

    res.status(403).send({
      message: "¡Se requiere rol de Moderador o Administrador!"
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al verificar roles de Moderador o Administrador"
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};

export default authJwt;