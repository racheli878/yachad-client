import { createPortal } from "react-dom";

const ConfirmModal = ({ title, text, confirmText, onConfirm, onCancel }:
    { title: string, text: string, confirmText: string, onConfirm: () => void, onCancel: () => void; }) => {
    return createPortal(
        <div className="modal-backdrop">
            <div className="modal">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-text">{text}</div>
                <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={onCancel}> ביטול</button>
                    <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;