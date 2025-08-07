const Cancha = require('../models/cancha.model');

// Obtener todas las canchas
exports.getAll = async (req, res) => {
  try {
    const canchas = await Cancha.findAll();
    res.json(canchas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las canchas', error });
  }
};

// Obtener una cancha por ID
exports.getById = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ message: 'Cancha no encontrada' });
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cancha', error });
  }
};

// Crear una cancha
exports.create = async (req, res) => {
  try {
    const { nombre, ubicacion, capacidad } = req.body;
    const cancha = await Cancha.create({ nombre, ubicacion, capacidad });
    res.status(201).json(cancha);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cancha', error });
  }
};

// Actualizar una cancha
exports.update = async (req, res) => {
  try {
    const { nombre, ubicacion, capacidad } = req.body;
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ message: 'Cancha no encontrada' });
    await cancha.update({ nombre, ubicacion, capacidad });
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cancha', error });
  }
};

// Eliminar una cancha
exports.delete = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.id);
    if (!cancha) return res.status(404).json({ message: 'Cancha no encontrada' });
    await cancha.destroy();
    res.json({ message: 'Cancha eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cancha', error });
  }
};