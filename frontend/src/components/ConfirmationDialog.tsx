import React from "react";
import { Dialog } from "@headlessui/react";

interface IConfirmationDialogProps {
  title: string;
  isOpen: boolean;
  closeDialog: any;
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
        <div className="fixed inset-0 bg-black bg-opacity-50" />{" "}
        {/* Custom Overlay */}
        <Dialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-sm">
            <Dialog.Title className="text-xl font-bold mb-4">
              {title}
            </Dialog.Title>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={() => handleClose(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
