console.log('🔴 INICIANDO SERVIDOR...');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('🔴 MÓDULOS CARGADOS...');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

console.log('🔴 CONECTANDO A MONGODB...');

// Conexión a MongoDB
mongoose.connect('mongodb+srv://usuarioproject:Pasword123@mi-proyecto.rwxsbay.mongodb.net/mi-basedatos?appName=mi-proyecto', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
})
.catch(err => {
    console.log('❌ ERROR conectando a MongoDB:', err.message);
    process.exit(1);
});

// ⚠️ AGREGA ESTE MODELO (FALTABA)
const Usuario = mongoose.model('Usuario', {
    nombre: String,
    email: String,
    fecha: { type: Date, default: Date.now }
});

// Ruta para registrar usuario (AGREGA ESTA RUTA)
app.post('/api/registro', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        
        const usuario = new Usuario({ nombre, email });
        await usuario.save();
        
        res.json({ 
            success: true,
            mensaje: 'Usuario registrado exitosamente',
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            mensaje: 'Error al guardar el usuario' 
        });
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json({ success: true, usuarios });
    } catch (error) {
        res.status(500).json({ success: false, mensaje: 'Error al obtener usuarios' });
    }
});

// Ruta de salud para verificar que funciona
app.get('/api/health', (req, res) => {
    res.json({ 
        status: '✅ Servidor funcionando', 
        timestamp: new Date().toISOString(),
        baseDatos: 'MongoDB Atlas'
    });
});

// ⚠️ SOLO UN app.listen() - ELIMINA EL DUPLICADO
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🎯 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});