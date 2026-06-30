/**
 * This is the EditNotice page component. It provides a form for editing an existing notice. When the form is submitted, it sends a PUT request to the /api/notices/:id endpoint with the updated form data. If the request is successful, it displays a success message and redirects the user to the home page. If there is an error, it displays an error message.
 *
 * The component uses the NoticeForm component to render the form. It fetches the existing notice data from the /api/notices/:id endpoint and passes it as `initialData` to the NoticeForm. It also passes an onSubmit function to the NoticeForm, which handles the form submission logic.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NoticeForm from "../../../components/NoticeForm.jsx";

export default function EditNotice() {
    const router = useRouter();

    const { id } = router.query;

    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchNotice() {
        try {
            const response = await fetch(`/api/notices/${id}`);

            const result = await response.json();

            if (!result.success) {
                alert(result.error);
                router.push("/");
                return;
            }

            setNotice(result.data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch notice.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) return;

        async function loadNotice() {
            await fetchNotice();
        }

        loadNotice();
    }, [id]);

    async function handleUpdate(formData) {
        try {
            const response = await fetch(`/api/notices/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!result.success) {
                alert(result.error);
                return;
            }

            alert("Notice updated successfully.");

            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    }

    if (loading) {
        return (
            <main className="container">
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main className="container">
            <h1>Edit Notice</h1>

            <NoticeForm
                initialData={notice}
                onSubmit={handleUpdate}
            />
        </main>
    );
}