import React, { ReactNode } from "react";
import SButton from "@ui/SButton";

interface ModalDialogProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  loading: boolean;
  disabled?: boolean;
  handleClose: () => void;
  onSubmit: () => void;
}

const ModalDialog = ({
  title,
  children,
  isOpen,
  loading,
  disabled = false,
  handleClose,
  onSubmit,
}: ModalDialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75"
      role="dialog"
      aria-modal="true"
      tabIndex={0}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-white shadow-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={handleClose}
            type="button"
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 text-center">{children}</div>

        <div className="flex justify-end gap-2 p-4">
          <SButton
            label="Cancel"
            onClick={handleClose}
            disabled={loading}
            className="inline-flex text-third bg-white border w-full justify-center rounded-md px-3 py-2 text-sm font-semibold"
          />

          <SButton
            label={loading ? "Saving..." : "Save"}
            onClick={onSubmit}
            disabled={loading || disabled}
            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:w-auto ${loading || disabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-500"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
