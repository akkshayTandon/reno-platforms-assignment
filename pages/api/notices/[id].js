import {
    getNoticeById,
    updateNotice,
    deleteNotice,
} from "../../../services/noticeService.js";

import { noticeSchema } from "../../../utils/validation.js";


// API route handler for /api/notices/[id] to handle GET, PUT, and DELETE requests for a specific notice by ID.
export default async function handler(req, res) {
    const id = parseInt(req.query.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            error: "Invalid notice ID.",
        });
    }

    switch (req.method) {
        case "GET":
            return handleGet(id, res);

        case "PUT":
            return handlePut(id, req, res);

        case "DELETE":
            return handleDelete(id, res);

        default:
            return res.status(405).json({
                success: false,
                error: "Method Not Allowed",
            });
    }
}

// Handle GET request to fetch a single notice by ID
async function handleGet(id, res) {
    try {
        const notice = await getNoticeById(id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                error: "Notice not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: notice,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: "Failed to fetch notice.",
        });
    }
}

// Handle PUT request to update a notice by ID
async function handlePut(id, req, res) {
    try {
        const existingNotice = await getNoticeById(id);

        if (!existingNotice) {
            return res.status(404).json({
                success: false,
                error: "Notice not found.",
            });
        }

        const result = noticeSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: "Validation failed.",
                details: result.error.flatten(),
            });
        }

        const updatedNotice = await updateNotice(id, result.data);

        return res.status(200).json({
            success: true,
            data: updatedNotice,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: "Failed to update notice.",
        });
    }
}

// Handle DELETE request to delete a notice by ID
async function handleDelete(id, res) {
    try {
        const existingNotice = await getNoticeById(id);

        if (!existingNotice) {
            return res.status(404).json({
                success: false,
                error: "Notice not found.",
            });
        }

        await deleteNotice(id);

        return res.status(200).json({
            success: true,
            message: "Notice deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: "Failed to delete notice.",
        });
    }
}