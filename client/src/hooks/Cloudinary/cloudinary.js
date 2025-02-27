import axios from "axios";
export const uploadImage = async (imageFile) => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "upload_image"); // Thay thế bằng upload preset của bạn
    formData.append("cloud_name", "dmjq8xpp9"); // Thay thế bằng cloud name của bạn

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dmjq8xpp9/image/upload`,
            formData
        );
        return response.data.secure_url; 
    } catch (error) {
        console.error("Upload image failed:", error);
        return "";
    }
};

// Example usage of uploadImage function
const exampleImageFile = new File([""], "example.png");
uploadImage(exampleImageFile).then((url) => {
    console.log("Uploaded image URL:", url);
});

