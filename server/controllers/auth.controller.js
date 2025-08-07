const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

exports.register = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) return res.status(400).json({ message: 'Correo ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, correo, password: hash });
    res.status(201).json({ message: 'Usuario registrado', usuario: { id: usuario.id, nombre, correo } });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(400).json({ message: 'Credenciales inválidas' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }, SECRET, { expiresIn: '8h' });
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};