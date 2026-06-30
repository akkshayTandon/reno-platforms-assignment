/** 
 * This component represents a confirmation dialog for deleting a notice. It takes in three props: `isOpen`, `onConfirm`, and `onCancel`. If `isOpen` is false, the component returns null and does not render anything. When `isOpen` is true, it displays a modal overlay with a message asking the user to confirm the deletion of the notice. There are two buttons: one for canceling the action and one for confirming the deletion. The `onCancel` function is called when the cancel button is clicked, and the `onConfirm` function is called when the delete button is clicked.
*/

export default function DeleteConfirmation({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Delete Notice</h2>

                <p>
                    Are you sure you want to
                    delete this notice?
                </p>

                <div className="modal-actions">
                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}