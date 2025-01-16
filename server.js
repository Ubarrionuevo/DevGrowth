import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';

const app = express();
const resend = new Resend('re_VCBsxfKm_MgBGVeZkjXebvgrkBG3UYEAz');

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint para la lista de espera
app.post('/api/waitlist', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email es requerido' });
        }

        await resend.emails.send({
            from: 'DevsGrow <onboarding@resend.dev>',
            to: email,
            subject: '¡Bienvenido a la lista de espera de DevsGrow!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #6B46C1;">¡Bienvenido a DevsGrow! 🚀</h1>
                    <p>¡Gracias por unirte a nuestra lista de espera!</p>
                    <p>Serás de los primeros en saber cuando lancemos:</p>
                    <ul>
                        <li>Proyectos personalizados para tu portafolio</li>
                        <li>Feedback en tiempo real de tus proyectos</li>
                        <li>Recursos exclusivos para desarrollo</li>
                    </ul>
                    <p style="color: #666;">¡Nos vemos pronto!</p>
                    <p style="color: #666;">El equipo de DevsGrow</p>
                </div>
            `
        });

        res.status(200).json({ message: 'Te has registrado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al procesar el registro' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 