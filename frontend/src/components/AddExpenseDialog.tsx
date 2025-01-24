import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import api from "../apis";
import { Category } from "../models/expense.model";
import { ENDPOINTS } from "../constants";

const AddExpenseDialog = ({
  categories,
  isOpen,
  closeModal,
}: {
  categories: Category[];
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post(ENDPOINTS.CREATE_EXPENSE, {
        item_name: itemName,
        cost,
        category_id: category,
      });
      closeModal();
    } catch (error) {
      console.error(error);
      // Handle errors as needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black bg-opacity-50" />{" "}
      {/* Custom Overlay */}
      <Dialog.Panel className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg w-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            Add Expense
          </Dialog.Title>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Expense"}
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddExpenseDialog;
