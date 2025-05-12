// models/role.model.js

const Role = (sequelize, Sequelize) => {
    return sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  };
  
  export default Role;