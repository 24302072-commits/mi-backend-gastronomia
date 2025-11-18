console.log('🔴 INICIANDO SERVIDOR SIMPLE...');

const express = require('express');
const app = express();
const PORT = 5000;

// Middleware básico
app.use(express.json());

// Ruta de prueba SUPER SIMPLE
app.get('/api/health', (req, res) => {
    console.log('✅ Alguien accedió a /api/health');
    res.json({ 
        status: '✅ Servidor funcionando SIN MongoDB', 
        timestamp: new Date().toISOString()
    });
});

// Ruta de registro SIN base de datos
app.post('/api/registro', (req, res) => {
    console.log('📨 Datos recibidos:', req.body);
    res.json({ 
        success: true,
        mensaje: 'Usuario recibido (sin guardar en BD)',
        datos: req.body
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🎯 Servidor SIMPLE corriendo en http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

console.log('🔴 SERVIDOR CONFIGURADO, INICIANDO...');