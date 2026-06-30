/**
 * This is the AddNotice page component. It provides a form for creating a new notice. When the form is submitted, it sends a POST request to the /api/notices endpoint with the form data. If the request is successful, it displays a success message and redirects the user to the home page. If there is an error, it displays an error message.
 *
 * The component uses the NoticeForm component to render the form. It passes an onSubmit function to the NoticeForm, which handles the form submission logic.
 */

import { useRouter } from "next/router";

import NoticeForm from "../../components/NoticeForm.jsx";

export default function AddNotice() {
    const router = useRouter();

    async function handleCreate(formData) {
        try {
            const response = await fetch("/api/notices", {
                method: "POST",
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

            alert("Notice created successfully.");

            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    }

    return (
        <main className="container">
            <h1>Add Notice</h1>

            <NoticeForm onSubmit={handleCreate} />
        </main>
    );
}