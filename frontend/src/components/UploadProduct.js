import React, { useState } from 'react'
import {CgClose} from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import {FaCloudUploadAlt} from 'react-icons/fa'
import uploadImage from '../helpers/uploadImage'
import ImageDisplay from './ImageDisplay'
import {MdDelete} from "react-icons/md"
import SummaryApi from '../common'
import {toast} from 'react-toastify'




const UploadProduct = ({
    onClose,
    fetchData
}) => {
    const [data,setData]=useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    })
    const [openFullScreenImage,setOpenFullScreenImage]=useState(false)
   const [fullScreenImage,setFullScreenImage]=useState("")
    const handleOnChange=(e)=>{
      const {name,value}=e.target
      setData((preve)=>{
        return{
          ...preve,
          [name]: value
        }
      })
    }
    const handleUploadProduct= async (e)=>{
      const file = e.target.files[0]
    
     

      const uploadImageCloudinary = await uploadImage(file)
      setData((preve)=>{
        return{
          ...preve,
          productImage: [...preve.productImage,uploadImageCloudinary.url]
        }
      })
     
    }
    const handleDeleteProductImage = async(index)=>{
        console.log("image index",index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
        setData((preve)=>{
          return{
            ...preve,
            productImage: [...newProductImage]
          }
        })

    }

    const handleSubmit= async(e)=>{
         e.preventDefault()
         const response = await fetch(SummaryApi.uploadProduct.url,{
          method : SummaryApi.uploadProduct.method,
          credentials: 'include',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
         })
         const responseData = await response.json()

         if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchData()
         }
         if(responseData.error){
          toast.error(responseData?.message)
         }

        
    }
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center '>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden  '>
          <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-bold'>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose/>
            </div>
          </div>

          <form className='grid p-4 gap-2  overflow-y-auto h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product name:</label>
            <input type='text' id='productName'
            name='productName'
             placeholder='enter product name' 
             value={data.productName} onChange={handleOnChange}
             className='p-1 bg-slate-200 border rounded ' required/>

             <label htmlFor='brandName' className='mt-2'>Brand name:</label>
            <input type='text' id='brandName'
            name='brandName'
             placeholder='enter brand name' 
             value={data.brandName} onChange={handleOnChange}
             className='p-1 bg-slate-200 border rounded' required/>

             <label htmlFor='category ' className='mt-2'>Category:</label>
             <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-200 border rounded'>
             <option value={""} >Select category</option>
                {
                  productCategory.map((el,index)=>{
                    return(
                      <option value={el.value} key={el.value+index}>{el.label}</option>
                    )
                  })
                }
             </select>

             <label htmlFor='productImage' className='mt-3'>Product Image:</label>
             <label htmlFor='uploadImageInput'>
             <div className='p-1 bg-slate-100 border rounded h-60 w-full flex  justify-center items-center cursor-pointer'>
               <div className='text-slate-500 flex flex-col justify-center items-center'>
                  <span className='text-3xl'><FaCloudUploadAlt/></span>
                  <p className='text-sm'>Upload Image</p>
                </div>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
              </div>
             </label>
             <div>
              {
                data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                      data.productImage.map((el,index)=>{
                    return(
                    <div className='relative group'>
                        <img src={el} alt='el' width={80} height={80} 
                         className='bg-slate-100 border cursor-pointer' 
                         onClick={()=>{setOpenFullScreenImage(true) 
                         setFullScreenImage(el)
                       }}/>
                        <div className='absolute bottom-0 right-0 bg-red-600 text-white rounded-full hidden cursor-pointer group-hover:block' onClick={()=>handleDeleteProductImage(index)}>
                          <MdDelete/>
                        </div>
                     </div>
                      
                    )
                  })
                  }
                </div>
                ): (
                  <p className='text-red-600 text-xs'>Upload image</p>
                )
              }
             
             </div>
             <label htmlFor='price' className='mt-3'>Price:</label>
             <input type='number' id='price'
             name='price'
             placeholder='enter product price' 
             value={data.price} onChange={handleOnChange}
             className='p-1 bg-slate-200 border rounded ' required/>

            <label htmlFor='sellingPrice' className='mt-3'>Selling price:</label>
             <input type='number' id='sellingPrice'
             name='sellingPrice'
             placeholder='enter product sellingPrice' 
             value={data.sellingPrice} onChange={handleOnChange}
             className='p-1 bg-slate-200 border rounded ' required/>

            <label htmlFor='description' className='mt-3'>Description:</label>
            <textarea className='h-28 bg-slate-100 border resize-none p-1' rows={3} onChange={handleOnChange}
            name='description' placeholder='enter product description' value={data.description}>

            </textarea>
             <button className='px-3 py-1 bg-red-600 text-white mb-5 hover:bg-red-700'>Upload product</button>
          </form>
        </div>
       {
        openFullScreenImage && (
          <ImageDisplay onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
    </div>
  )
}

export default UploadProduct

