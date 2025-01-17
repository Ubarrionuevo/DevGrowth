import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';

const app = express();
const resend = new Resend('re_VCBsxfKm_MgBGVeZkjXebvgrkBG3UYEAz');

// Configuración de CORS más permisiva para desarrollo
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando' });
});

app.post('/api/waitlist', async (req, res) => {
    console.log('Recibiendo solicitud:', req.body);
    
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email es requerido' });
        }

        const emailResponse = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: '¡Bienvenido a DevsGrow!',
            html: '<p>Gracias por unirte a nuestra lista de espera!</p>'
        });

        console.log('Respuesta de Resend:', emailResponse);
        res.status(200).json({ success: true, message: 'Email enviado' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 