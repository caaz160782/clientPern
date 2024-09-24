import { safeParse , number, parse, string, transform, pipe} from "valibot";
import { DraftProducSchema,Product,ProductsSchema,ProducSchema } from "../types";
import axios from "axios";

type ProductData={
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data:ProductData) {
   try {
    const result = safeParse(DraftProducSchema,{
                                        name :data.name,
                                        price: +data.price
                                    });
    if(result.success){
        const url=`${import.meta.env.VITE_API_URL}/products`
        await axios.post(url,{name: result.output.name,
                              price: result.output.price
                              });                                 
    }else{
        throw new Error('Datos no validos')
    }
   } catch (error) {
    console.log(error)
   }
}

export async function getProduct() {
    try {
      const url=`${import.meta.env.VITE_API_URL}/products`
      const {data} = await axios.get(url)      
      console.log(data)
      const result = safeParse(ProductsSchema,data.payload)
      if(result.success){
        return result.output
      }else{
        throw new Error('Error ...')
      }     
    } catch (error) {
     console.log(error)
    }
 }

 export async function getProductByID(id:Product['id']) {
  try {
    const url=`${import.meta.env.VITE_API_URL}/products/${id}`
    const {data} = await axios.get(url)      
    console.log(data)
    const result = safeParse(ProducSchema,data.payload)
    if(result.success){
      return result.output
    }else{
      throw new Error('Error ...')
    }     
  } catch (error) {
   console.log(error)
  }
} 

export async function updateProduct(data:ProductData, id:Product['id']) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());
   //const AvalabilitySchema =coerce(boolean(),boolean);

   const result = safeParse(ProducSchema,{
                                       id,      
                                       name :data.name,
                                       price: parse(NumberSchema,data.price),
                                       availability:data.availability==="true"?true:false
                                   });
   
   if(result.success){
       const url=`${import.meta.env.VITE_API_URL}/products/${id}`
       await axios.patch(url,{name: result.output.name,
                             price: result.output.price,
                             availability:result.output.availability
                             });                                 
   }else{
       throw new Error('Datos no validos')
   }
  } catch (error) {
   console.log(error)
  }
}

export async function deleteProductByID(id:Product['id']) {
  try {
    const url=`${import.meta.env.VITE_API_URL}/products/${id}`
    const {data} = await axios.delete(url)      
    const result = safeParse(ProducSchema,data.payload)
    if(result.success){
      return result.output
    }else{
      throw new Error('Error ...')
    }     
  } catch (error) {
   console.log(error)
  }
} 