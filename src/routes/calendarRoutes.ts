import express from 'express'
import { oauth2Client } from '../config/google';
import { google } from "googleapis";

const twoMonthsAgo = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

const router = express.Router()

router.get("/events", async (req, res) => {
    try {
        const token = req.cookies.googleToken;

        if (!token) return res.status(401).json({ error: "No autenticado" });

        oauth2Client.setCredentials({ access_token: token });
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: twoMonthsAgo.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
            eventTypes: ["default", "focusTime", "fromGmail", "outOfOffice", "workingLocation"]
        });

        res.json(response.data.items);
    } catch (error) {
        console.log(error);

    }
});

export default router