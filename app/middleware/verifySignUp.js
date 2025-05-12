// middleware/verifySignUp.js

import db from "../models/index.js";

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Verificar nombre de usuario duplicado
    const userByUsername = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (userByUsername) {
      return res.status(400).send({
        message: "Error: ¡El nombre de usuario ya está en uso!"
      });
    }

    // Verificar email duplicado
    const userByEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userByEmail) {
      return res.status(400).send({
        message: "Error: ¡El correo electrónico ya está en uso!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Error al verificar usuario o correo electrónico"
    });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Error: ¡El rol ${req.body.roles[i]} no existe!`
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

export default verifySignUp;