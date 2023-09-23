import React from "react";
import Modal from "react-modal";

interface ModelProps {
  isOpen: ReactModal
  onClose: ReactModal
  children: React.ReactNode
}

export function TaskModal({ isOpen, onClose, children }: any) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "900px",
          height: "63 0px",
          margin: "auto",
          borderRadius: "8px",
          padding: "20px",
        },
      }}
    >
      {children}
    </Modal>
  );
}
