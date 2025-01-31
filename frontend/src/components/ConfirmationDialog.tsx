import React from "react";
import { Dialog } from "@headlessui/react";

interface IConfirmationDialogProps {
  title: string;
  isOpen: boolean;
  closeDialog: (val: boolean) => void;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  title,
  isOpen,
  closeDialog,
}) => {
  const handleClose = (val: boolean = false) => {
    closeDialog(val);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Dialog open={isOpen} onClose={handleClose}>
        <div className="fixed inset-0 bg-gradient-to-b from-black to-transparent bg-opacity-50" />

        {/* Custom Overlay */}
        <Dialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
          <div className="bg-[var(--color-card-background)] p-6 rounded-lg w-sm">
            <Dialog.Title className="text-xl font-bold mb-4 text-[var(--color-text)]">
              {title}
            </Dialog.Title>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 bg-[var(--color-muted-button)] text-[var(--color-muted-text)] rounded-md hover:bg-[var(--color-muted-button-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-muted-button)]"
              >
                No
              </button>
              <button
                onClick={() => handleClose(true)}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                Yes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
