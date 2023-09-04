"use client";

import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa6";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import Spinner from "./Spinner";

export default function FormImages() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadImages = async (e) => {
    const files = e.target?.files;
    console.log("files-images:", files);

    if (files?.length > 0) {
      setIsUploading(true);
      const formData = new FormData();

      for (const file of files) {
        formData.append("file", file);
      }
      console.log("===Formdata====", formData);
      try {
        const { data } = await axios.post("/api/uploadimages", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("==========res-data==========", data);
      } catch (error) {
        console.log(error.response?.data);
      }
      setIsUploading(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("folder", "Liem");
    const file = formData.get("file");
    console.log("file image:", file);

    if (file instanceof Blob) {
      formData.append("file", file);
    } else {
      throw new Error("Invalid file data");
    }
    console.log("Before fileResponse:", formData);
    try {
      const { data } = await axios.post("/pages/api/uploadimages", formData);
      //   const { data } = await fetch("/pages/api/uploadimages", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     body: formData,
      //   });
      console.log("==========res-data==========", data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Photos</label>
      <div className="photo">
        {isUploading ? (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        ) : (
          <label className="uploadimage">
            <div>Add image</div>
            <input
              type="file"
              name="file"
              hidden
              multiple
              onChange={uploadImages}
            />
          </label>
        )}
        {/* <button className="bg-red-600 p-3 w-32 text-center rounded text-white">
          Upload
        </button> */}
      </div>
    </form>
  );
}
