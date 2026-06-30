// Database queries

import { prisma } from "../lib/prisma";

// Get all notices ordered by priority and publish date - READ
export async function getAllNotices() {
    return prisma.notice.findMany({
        orderBy: [
            {
                priority: "desc",
            },
            {
                publishDate: "desc",
            },
        ],
    });
}

// Get a single notice by ID - READ
export async function getNoticeById(id) {
    return await prisma.notice.findUnique({
        where: {
            id,
        },
    });
}

// Get a single notice by ID - POST
export async function createNotice(data) {
    return await prisma.notice.create({
        data: {
            ...data,
            image: data.image || null,
        },
    });
}

// Update a notice by ID - PUT
export async function updateNotice(id, data) {
    return await prisma.notice.update({
        where: {
            id,
        },
        data: {
            ...data,
            image: data.image || null,
        },
    });
}

// Delete a notice by ID - DELETE
export async function deleteNotice(id) {
    return await prisma.notice.delete({
        where: {
            id,
        },
    });
}