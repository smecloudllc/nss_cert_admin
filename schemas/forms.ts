import * as z from "zod";

// Editor schema
export const EditorformSchema = z.object({
  title: z.string().min(1, { message: "Title field is required" }),
  body: z.string().min(1, { message: "Body field is required" }),
  description: z.string().min(1, { message: "Description field is required" }),
  image: z.string().min(1, { message: "Image field is required" }),
  tags: z.array(z.string()).min(1, { message: "Tags field is required" }),
  draft: z.boolean().optional(),
});

// Notification schema
export const NotificationformSchema = z.object({
  title: z.string().min(1, { message: "Title field is required" }),
  body: z.string().min(1, { message: "Body field is required" }),

  image: z.string().min(1, { message: "Image field is required" }),
  interests: z.array(z.string()).optional(),
  recipients: z.array(z.string()).optional(),
});

// Announcement schema
export const AnnouncementformSchema = z.object({
  title: z.string().min(1, { message: "Title field is required" }),
  body: z.string().min(1, { message: "Body field is required" }),
  locale: z.string().min(1, { message: "Locale field is required" }),
  country_id: z.string().optional(),
});

// FAQ schema
export const FAQformSchema = z.object({
  question: z.string().min(1, { message: "Question field is required" }),
  answer: z.string().min(1, { message: "Answer field is required" }),
});

// Image Upload Schema
export const ImageUpload = z.object({
  image: z.string().min(1, { message: "Image field is required" }),
});
