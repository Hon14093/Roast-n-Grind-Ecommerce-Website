// import { useSignatureStore } from '@/stores/useSignatureStore'


const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export const uploadImage = async (file) => {
  const resizedFile = await resizeImage(file, 1000)

  const formData = new FormData()
  formData.append('file', resizedFile)
  formData.append('upload_preset', UPLOAD_PRESET)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Upload failed')
  }

  const data = await response.json() ///giai ma
  return data.secure_url
}

const resizeImage = (file, maxSize) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            resolve(
              new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
            )
          },
          'image/jpeg',
          0.7
        )
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

// export const changeImage = async (oldImageUrl, newFile) => {
//   try {
//     const publicId = oldImageUrl.split('/').pop().split('.')[0]

//     // await deleteImage(publicId)
//     console.log('Old image deleted successfully')

//     const newImageUrl = await uploadImage(newFile)
//     console.log('New image uploaded successfully:', newImageUrl)

//     return newImageUrl
//   } catch (error) {
//     console.error('Error changing image:', error.message || error)
//     throw error
//   }
// }

// const signatureStore = useSignatureStore()

// export const deleteImage = async (public_id) => {
//   signatureStore.resetSignature()
//   signatureStore.loading = true

//   try {
//     await signatureStore.fetchSignature(public_id)
//     const { signature, timestamp, api_key, cloudName } = signatureStore

//     if (!signature || !timestamp || !api_key || !cloudName) {
//       throw new Error('Failed to fetch required signature details')
//     }

//     const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`

//     const cloudinaryResponse = await axios.post(url, null, {
//       params: { public_id, signature, timestamp, api_key }
//     })

//     if (cloudinaryResponse.data.result !== 'ok') {
//       throw new Error('Failed to delete image from Cloudinary')
//     }

//     console.log('Image deleted successfully', cloudinaryResponse.data)
//   } catch (error) {
//     console.error('Error deleting image:', error)
//     signatureStore.error = error.message || 'Failed to delete image'
//   } finally {
//     signatureStore.loading = false
//   }
// }