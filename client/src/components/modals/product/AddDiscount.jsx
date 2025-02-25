// import React, { Component } from 'react';

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';


// class AddDiscount extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             preview: null,
//             discountCode: '',
//             discountValue: '',
//             maxDiscountAmount: '',
//             minOrderAmount: '',
//             startDate: '',
//             endDate: '',
//             isActive: false,
//             file: null
//         };
//     }

//     handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 this.setState({ preview: reader.result, file });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     handleChange = (e) => {
//         this.setState({ [e.target.id]: e.target.value });
//     };

//     handleSubmit = async (e) => {
//         e.preventDefault();
//         const { file, productName, productDescription } = this.state;

//         if (file && productName && productDescription) {
//             try {
//                 const imageUrl = await uploadImage(file);
//                 console.log('Uploaded image URL:', imageUrl);

//                 const response = await fetch('/api/products', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         name: productName,
//                         description: productDescription,
//                         imageUrl: imageUrl,
//                     }),
//                 });

//                 if (response.ok) {
//                     console.log('Product added successfully');
//                 } else {
//                     console.error('Failed to add product');
//                 }
//             } catch (error) {
//                 console.error('Error uploading image or adding product:', error);
//             }
//         } else {
//             console.error('Please fill in all fields and select an image');
//         }
//     };

//     render() {
//         const { preview, productName, productDescription } = this.state;

//         return (
//             <form className="mx-auto gap-5 grid" onSubmit={this.handleSubmit}>
//                 <div className='grid grid-cols-2 gap-6 items-start'>
//                     <section className='grid gap-5'>
//                         <article className="grid w-full items-center gap-1.5">
//                             <Label htmlFor="product_id">ID sản phẩm</Label>
//                             <Input 
//                                 id="product_id" 
//                                 placeholder="ID sản phẩm" 
//                                 disabled
//                             />
//                         </article>

//                         <article className="grid w-full items-center gap-1.5">
//                             <Label htmlFor="product_name">Tên sản phẩm</Label>
//                             <Input 
//                                 id="product_name" 
//                                 placeholder="Tên sản phẩm" 
//                                 value={productName}
//                                 onChange={this.handleChange}
//                             />
//                         </article>

//                         <article className="grid w-full items-center gap-1.5">
//                             <Label htmlFor="product_des">Miêu tả</Label>
//                             <Textarea 
//                                 id="product_des" 
//                                 placeholder="Miêu tả" 
//                                 value={productDescription}
//                                 onChange={this.handleChange}
//                             />
//                         </article>
//                     </section>
                    
//                     <section>
//                         <div className="grid w-full items-center gap-1.5">
//                             <Label htmlFor="picture">Hình ảnh sản phẩm</Label>
//                             <Input 
//                                 id="picture" 
//                                 type="file" 
//                                 accept="image/*"
//                                 onChange={this.handleImageChange} 
//                                 className='-py-1' 
//                             />

//                             {preview && (
//                                 <div className='flex justify-center'>
//                                     <img 
//                                         src={preview} 
//                                         alt="Product Preview" 
//                                         className="w-72 h-72 object-cover rounded-md border"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </section>
//                 </div>

//                 <Button type="submit">Thêm sản phẩm</Button>
//             </form>
//         );
//     }
// }

// export default AddDiscount;
