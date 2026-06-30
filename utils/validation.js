import { z } from "zod";

export const noticeSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),

    body: z
        .string()
        .trim()
        .min(1, "Body is required"),

    category: z.enum([
        "EXAM",
        "EVENT",
        "GENERAL",
    ]),

    priority: z.enum([
        "NORMAL",
        "URGENT",
    ]),

    publishDate: z.coerce.date({
        error: "Invalid publish date",
    }),

    image: z
        .string()
        .trim()
        .url("Image must be a valid URL")
        .optional()
        .or(z.literal("")),
});