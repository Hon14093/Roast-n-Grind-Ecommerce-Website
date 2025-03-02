import axios from "axios";

export const uploadImage = async (e, imageFile, setImageURL) => {
    e.preventDefault();
    if (!imageFile) return "Image file is required";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post('http://localhost:5000/image/upload', formData);
        console.log("Uploaded image URL:", response);
        setImageURL(response.data.url);
        return response.data.url; 
    } catch (error) {
        console.error("Upload image failed:", error);
        return "";
    }
};

export const uploadImage1 = async (imageFile) => {
    if (!imageFile) return "Image file is required";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post('http://localhost:5000/image/upload', formData);
        console.log("Uploaded image URL:", response.data.url);
        return response.data.url; 
    } catch (error) {
        console.error("Upload image failed:", error);
        return "";
    }
};

