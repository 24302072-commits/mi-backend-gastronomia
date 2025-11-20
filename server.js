const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://tu-frontend.vercel.app'  // ACTUALIZA con tu URL real de Vercel
    ],
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://usuarioproject:Pasword123@mi-proyecto.rwxsbay.mongodb.net/mi-basedatos?retryWrites=true&w=majority';

console.log('🔗 Conectando a MongoDB...');

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ CONECTADO a MongoDB Atlas');
})
.catch((error) => {
    console.log('❌ ERROR MongoDB:', error.message);
});

// Modelo de usuario
const Usuario = mongoose.model('Usuario', {
    nombre: String,
    email: String,
    fecha: { type: Date, default: Date.now }
});

// RUTA RAÍZ - IMPORTANTE PARA RENDER
app.get('/', (req, res) => {
    res.json({ 
        mensaje: '🚀 Backend funcionando en Render',
        estado: 'OK',
        rutas: {
            health: '/api/health',
            registro: '/api/registro', 
            usuarios: '/api/usuarios'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: '✅ Servidor funcionando',
        timestamp: new Date().toISOString(),
        baseDatos: mongoose.connection.readyState === 1 ? 'MongoDB Atlas' : 'Sin conexión'
    });
});

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

app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json({ success: true, usuarios });
    } catch (error) {
        res.status(500).json({ success: false, mensaje: 'Error al obtener usuarios' });
    }
});

// PUERTO CORREGIDO - ESCUCHAR EN 0.0.0.0
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎯 Servidor corriendo en puerto ${PORT}`);
    console.log(`📊 URL: https://mi-backend-gastronomia.onrender.com`);
});