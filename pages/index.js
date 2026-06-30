import { useEffect, useState } from "react";
import Link from "next/link";

import NoticeCard from "../components/NoticeCard";
import DeleteConfirmation from "../components/DeleteConfirmation";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  // useEffect(() => {
  //   fetchNotices();
  // }, []);

  async function fetchNotices() {
    try {
      setLoading(true);

      const response = await fetch("/api/notices");
      const result = await response.json();

      if (result.success) {
        setNotices(result.data);
      } else {
        alert(result.error || "Failed to fetch notices.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // fetchNotices();
    async function fetchData() {
      await fetchNotices();
    }
    fetchData();
  }, []);

  function handleDeleteClick(id) {
    setSelectedNoticeId(id);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      const response = await fetch(
        `/api/notices/${selectedNoticeId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        setNotices((prev) =>
          prev.filter(
            (notice) => notice.id !== selectedNoticeId
          )
        );
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete notice.");
    } finally {
      setShowDeleteModal(false);
      setSelectedNoticeId(null);
    }
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setSelectedNoticeId(null);
  }

  if (loading) {
    return (
      <main className="container">
        <h2>Loading notices...</h2>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="page-header">
        <h1>Notice Board</h1>

        <Link href="/notice/add">
          <button className="add-btn">
            + Add Notice
          </button>
        </Link>
      </div>

      {notices.length === 0 ? (
        <div className="empty-state">
          <h2>No notices found.</h2>
          <p>Create your first notice.</p>
        </div>
      ) : (
        <div className="notice-grid">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
}