"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Dialog from "./Dialog";
import { UploadInput } from "./UploadInput";

interface UploadResult {
  success: boolean;
  name?: string;
}

const SettingButton = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [loading, setLoading] = useState<boolean>(true); // 用來顯示加載狀態
  const [error, setError] = useState<string | null>(null); // 用來顯示錯誤信息

  const [title, setTitle] = useState("");
  const [bgImage, setBgImage] = useState("");
  const fileURL = process.env.FILE_URL ?? "http://localhost:3000/uploads";

  // 處理上傳結果的函數
  const handleUpload = (result: UploadResult) => {
    if (result.success) {
      console.log("Upload successful:", result.name);
      setBgImage(`${fileURL}/${result.name}`);
    } else {
      console.log("Upload failed");
    }
  };

  const handleSave = async () => {
    try {
      // 發送 PUT 請求來更新設置
      const response = await fetch("/api/option", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          options: [
            {
              optionName: "title",
              optionValue: title,
            },
            {
              optionName: "bg-image",
              optionValue: bgImage,
            },
          ],
        }),
      });

      // 檢查響應狀態
      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      // 解析響應結果
      const result = await response.json();
      if (result.success) {
        alert("Settings saved successfully!");
        closeDialog(); // 關閉對話框
        // 可選：刷新頁面以顯示最新設置
        router.refresh();
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      setError("Failed to save settings"); // 更新狀態以顯示錯誤信息
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/option");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const results = await res.json();
        for (let i = 0; i < results.length; i += 1) {
          const option = results[i];
          if (option.optionName === "title") {
            setTitle(option.optionValue);
          }
          if (option.optionName === "bg-image") {
            setBgImage(option.optionValue);
          }
        }
      } catch (error) {
        setError("Failed to load data"); // 更新狀態以顯示錯誤
      } finally {
        setLoading(false); // 更新狀態以顯示加載完成
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>; // 顯示加載中的狀態
  if (error) return <p className="text-red-500">{error}</p>; // 顯示錯誤信息

  return (
    <>
      <button onClick={openDialog}>
        <i className="ti ti-settings" />
        <span>設定</span>
      </button>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Setting">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Web Site Title
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
          <br />
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Web Site BackGround Image
          </label>
          <input
            type="text"
            id="title"
            value={bgImage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBgImage(e.target.value)
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter title"
          />
          <UploadInput onUpload={handleUpload} />
          <br />
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default SettingButton;
