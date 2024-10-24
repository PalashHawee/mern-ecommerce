// import React, { useEffect, useRef } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { Skeleton } from "../ui/skeleton";

// const ProductImageUplaod = ({
//   imageFile,
//   setImageFile,
//   uploadedImageUrl,
//   setUploadedImageUrl,
//   imageLoadingState,
//   setImageLoadingState,
// }) => {
//   const inputRef = useRef(null);

//   const handleImageFileChange = (event) => {
//     console.log(event.target.files);
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) setImageFile(selectedFile);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.target.classList.add("border-dashed-2");
//     event.target.classList.remove("border-dashed-400");
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer.files?.[0];
//     if (droppedFile) setImageFile(droppedFile);
//   };

//   const handleRemoveImage = () => {
//     setImageFile(null);

//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };

//   const uplaodImageToCloudinary = async () => {
//     setImageLoadingState(true);
//     const data = new FormData();
//     data.append("my_file", imageFile);
//     const response = await axios.post(
//       "http://localhost:5000/api/admin/products/upload-image",
//       data
//     );
//     console.log(response, "response");
//     if (response?.data?.success) {
//       setUploadedImageUrl(response.data.url);
//       setImageLoadingState(false);
//     }
//   };

//   useEffect(() => {
//     if (imageFile !== null) uplaodImageToCloudinary();
//   }, [imageFile]);

//   return (
//     <div className="w-full max-w-md mx-auto mt-4">
//       <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
//       <div onDragOver={handleDragOver} onDrop={handleDrop}>
//         <Input
//           id="image-upload" // Corrected spelling
//           type="file"
//           ref={inputRef}
//           onChange={handleImageFileChange}
//           className="hidden" // Uncomment if you want to hide the input
//         />
//         {!imageFile ? (
//           <Label
//             htmlFor="image-upload"
//             className="flex flex-col items-center h-32 justify-center border-2 border-dashed border-gray-400 cursor-pointer"
//           >
//             <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//             <span className="text-gray-600">
//               Drag and drop an image here or click to upload
//             </span>
//           </Label>
//         ) : imageLoadingState ? (
//           <Skeleton className="h-10 bg-purple-300" />
//         ) : (
//           <div className="flex items-center justify-between">
//             {/* <p>Selected File: {imageFile.name}</p>
//             <img
//               src={URL.createObjectURL(imageFile)}
//               alt="Selected"
//               className="mt-2 h-32 object-cover"
//             /> */}
//             <div className="flex items-center">
//               <FileIcon className="w-8 text-primary mr-2 h-8" />
//             </div>
//             <p className="text-sm font-medium">{imageFile.name}</p>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-muted-foreground hover:text-foreground"
//               onClick={handleRemoveImage}
//             >
//               <XIcon className="w-4 h-4" />
//               <span className="sr-only">Remove File</span>
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductImageUplaod;

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
