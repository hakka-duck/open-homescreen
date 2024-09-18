"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Dialog from "./Dialog";
import { useRouter } from "next/navigation";
import { ScreenContainer } from "./ScreenContainer";

const AddScreenButton = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = { icon, title, url };
    console.log("Submitted data:", data);
    // 可以在這裡進行額外的處理，例如發送數據到伺服器
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      icon: icon,
      title: title,
      url: url,
    });

    fetch("/api/homescreen", {
      method: "POST",
      headers: myHeaders,
      body: raw,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        router.refresh();
      })
      .catch((error) => console.error(error));
    closeDialog(); // 提交後關閉對話框
  };

  return (
    <>
      <ScreenContainer>
        <button onClick={openDialog}>
          <i className="ti ti-plus" style={{ fontSize: "80px" }} />
          <br />
          <strong>Add</strong>
        </button>
      </ScreenContainer>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Dialog Title">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter title"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700"
            >
              Icon
            </label>
            <input
              type="text"
              id="icon"
              value={icon}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIcon(e.target.value)
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter icon URL or class"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter URL"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeDialog}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddScreenButton;
