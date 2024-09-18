"use client";

interface UploadInputProps {
  onUpload: (result: { success: boolean; name?: string }) => void;
}

export const UploadInput: React.FC<UploadInputProps> = ({ onUpload }) => {
  return (
    <input
      type="file"
      name="file"
      onChange={async (e) => {
        if (e.target.files) {
          const formData = new FormData();
          Object.values(e.target.files).forEach((file) => {
            formData.append("file", file);
          });

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();
            if (result.success) {
              alert("Upload ok : " + result.name);
              onUpload(result);
            } else {
              alert("Upload failed");
              onUpload(result);
              onUpload({ success: false });
            }
          } catch (error) {
            onUpload({ success: false });
          }
        }
      }}
    />
  );
};
