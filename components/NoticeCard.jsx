/**
 * This is the NoticeCard component. It displays a single notice with its details and provides options to edit or delete the notice. The component takes in two props: `notice`, which contains the notice data, and `onDelete`, a function to handle the deletion of the notice. The component conditionally renders an "Urgent" badge if the notice's priority is set to "URGENT" and displays the notice's image if it exists.
 */


import Link from "next/link";
import Image from "next/image";


export default function NoticeCard({ notice, onDelete }) {
    return (
        <div className="notice-card">
            <div className="notice-header">
                <h2>{notice.title}</h2>

                {notice.priority === "URGENT" && (
                    <span className="urgent-badge">
                        Urgent
                    </span>
                )}
            </div>

            <div className="notice-meta">
                <span>
                    <strong>Category:</strong>{" "}
                    {notice.category.charAt(0) +
                        notice.category.slice(1).toLowerCase()}
                </span>

                <span>
                    <strong>Publish Date:</strong>{" "}
                    {new Date(
                        notice.publishDate
                    ).toLocaleDateString()}
                </span>
            </div>

            <p className="notice-body">
                {notice.body}
            </p>

            {notice.image && (
                // <img
                //     src={notice.image}
                //     alt={notice.title}
                //     className="notice-image"
                // />
                <Image
                    src={notice.image}
                    width={600}
                    height={350}
                    alt={notice.title}
                    loading="lazy"
                    className="notice-image"
                />
            )}

            <div className="notice-actions">
                <Link href={`/notice/edit/${notice.id}`}>
                    <button className="edit-btn">
                        Edit
                    </button>
                </Link>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(notice.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}