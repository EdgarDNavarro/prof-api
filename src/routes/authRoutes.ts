import express from 'express'
import { oauth2Client } from '../config/google';

const router = express.Router()

router.get("/google", (req, res) => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: ["https://www.googleapis.com/auth/calendar.events"],
            prompt: "consent",
        });
        res.json({ url: authUrl });
    } catch (error) {
        console.log(error)
    }
});

// Manejar el callback de Google OAuth
router.get("/google/callback", async (req, res) => {
    try {
        const code = req.query.code as string;

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Guardar el token en cookies (puedes usar una base de datos si prefieres)
        res.cookie("googleToken", tokens.access_token, {
            httpOnly: true,
            secure: false, // Pon en `true` en producción con HTTPS
        });

        res.redirect(`${process.env.FRONTEND_URL}/calendar`);
    } catch (error) {
        console.log(error);

    }
});

export default router