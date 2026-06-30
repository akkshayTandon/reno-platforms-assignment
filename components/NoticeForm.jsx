/**
 * This is the NoticeForm component. It provides a form for creating or editing notices. The form includes fields for the notice's title, body, category, priority, publish date, and an optional image URL. The component takes in two props: `initialData`, which is used to pre-fill the form fields when editing an existing notice, and `onSubmit`, a function that handles the form submission. The component manages its own state for the form data and loading state. When the form is submitted, it calls the `onSubmit` function with the current form data.
 */


import { useState } from "react";


const defaultFormData = {
    title: "",
    body: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
    image: "",
};

export default function NoticeForm({ initialData = defaultFormData, onSubmit }) {
    const [formData, setFormData] = useState({
        ...defaultFormData,
        ...initialData,
        image: initialData.image ?? "",
        publishDate: initialData.publishDate
            ? initialData.publishDate.split("T")[0]
            : "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="notice-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label>Title</label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Body</label>

                <textarea
                    name="body"
                    rows={6}
                    value={formData.body}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="EXAM">Exam</option>
                        <option value="EVENT">Event</option>
                        <option value="GENERAL">General</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Priority</label>

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="NORMAL">Normal</option>
                        <option value="URGENT">Urgent</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Publish Date</label>

                <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Image URL (Optional)</label>

                <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className="submit-btn"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Notice"}
            </button>
        </form>
    );
}