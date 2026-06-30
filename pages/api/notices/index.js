import {
    getAllNotices,
    createNotice,
} from "../../../services/noticeService";

import { noticeSchema } from "../../../utils/validation";


// API route handler for /api/notices to handle GET and POST requests for notices.
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGet(res);

        case "POST":
            return handlePost(req, res);

        default:
            return res.status(405).json({
                success: false,
                error: "Method Not Allowed",
            });
    }
}

// Handle GET request to fetch all notices
async function handleGet(res) {
    try {
        const notices = await getAllNotices();

        return res.status(200).json({
            success: true,
            data: notices,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: "Failed to fetch notices.",
        });
    }
}

// Handle POST request to create a new notice
async function handlePost(req, res) {
    try {
        const result = noticeSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: "Validation failed.",
                details: result.error.flatten(),
            });
        }

        const notice = await createNotice(result.data);

        return res.status(201).json({
            success: true,
            data: notice,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: "Failed to create notice.",
        });
    }
}