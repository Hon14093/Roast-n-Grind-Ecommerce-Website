import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadImage = async (file) => {
  if (!file) throw new Error("Không có file để upload!");

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return {
      imageId: response.data.public_id,
      imageUrl: response.data.secure_url,
    };
  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    throw new Error("Upload ảnh thất bại!");
  }
};





