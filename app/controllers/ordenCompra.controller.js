import db from "../models/index.js";
const OrdenCompra = db.ordenCompra;
const DetalleOrdenCompra = db.detalleOrdenCompra;
const User = db.user;

export const crearOrdenCompra = async (req, res) => {
  try {
    const {
      fechaEmision,
      Situacion,
      Total,
      CodLab,
      NrofacturaProv,
      detalles
    } = req.body;

    // Crear la orden principal
    const orden = await OrdenCompra.create({
      fechaEmision,
      Situacion,
      Total,
      CodLab,
      NrofacturaProv,
      userId: req.userId
    });

    // Crear los detalles de la orden
    if (detalles && detalles.length > 0) {
      for (const item of detalles) {
        await DetalleOrdenCompra.create({
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precio: item.precio,
          montouni: item.montouni,
          NroOrdenC: orden.NroOrdenC // 👈 CORREGIDO
        });
      }
    }

    res.status(201).json({ message: "Orden de compra registrada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden", error: error.message });
  }
};

export const listarOrdenesPorUsuario = async (req, res) => {
  try {
    const ordenes = await OrdenCompra.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: DetalleOrdenCompra,
          as: "detalles" // Usa el alias correctamente
        }
      ]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: "Error al listar órdenes", error: error.message });
  }
};

export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await OrdenCompra.findByPk(req.params.id, {
      include: [
        {
          model: DetalleOrdenCompra,
          as: "detalles" // 👈 alias correcto
        }
      ]
    });

    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la orden", error: error.message });
  }
};


export const actualizarOrdenCompra = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      fechaEmision,
      Situacion,
      Total,
      CodLab,
      NrofacturaProv,
      detalles
    } = req.body;

    const orden = await OrdenCompra.findByPk(id);
    if (!orden) {
      await t.rollback();
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (orden.userId !== req.userId) {
      await t.rollback();
      return res.status(403).json({ message: "No autorizado para editar esta orden" });
    }

    await orden.update({
      fechaEmision,
      Situacion,
      Total,
      CodLab,
      NrofacturaProv
    }, { transaction: t });

    await DetalleOrdenCompra.destroy({
      where: { NroOrdenC: id },
      transaction: t
    });
    if (detalles && detalles.length > 0) {
      for (const item of detalles) {
        await DetalleOrdenCompra.create({
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precio: item.precio,
          montouni: item.montouni,
          NroOrdenC: id
        }, { transaction: t });
      }
    }
    await t.commit();
    res.json({ message: "Orden de compra actualizada con éxito" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
  }
};

export const eliminarOrdenCompra = async (req, res) => {
  try {
    const { id } = req.params;

    const orden = await OrdenCompra.findByPk(id);
    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Solo puede eliminar su propia orden
    if (orden.userId !== req.userId) {
      return res.status(403).json({ message: "No autorizado para eliminar esta orden" });
    }

    // Primero eliminamos los detalles asociados
    await DetalleOrdenCompra.destroy({
      where: { NroOrdenC: id }
    });

    // Luego eliminamos la orden
    await orden.destroy();

    res.json({ message: "Orden de compra eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
  }
};
