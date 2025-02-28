import axios from "axios";
export const uploadImage = async (imageFile) => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "upload_image"); // Thay thế bằng upload preset của bạn
    formData.append("cloud_name", "dwuszt3qn"); // Thay thế bằng cloud name của bạn

    try {
        const response = await axios.post(
            // `https://api.cloudinary.com/v1_1/dmjq8xpp9/image/upload`,
            `https://api.cloudinary.com/v1_1/dwuszt3qn/image/upload`,
            formData
        );
        // console.log("Uploaded image URL:", url);
        console.log("Uploaded image URL:", response.data.secure_url);
        return response.data.secure_url; 
    } catch (error) {
        console.error("Upload image failed:", error);
        return "";
    }
};

// Example usage of uploadImage function
// const exampleImageFile = new File([""], "example.png");
// uploadImage(exampleImageFile).then((url) => {
//     console.log("Uploaded image URL:", url);
// });

