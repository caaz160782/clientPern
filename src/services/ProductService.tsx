import { safeParse } from "valibot";
import { DraftProducSchema,ProducSchema,ProductsSchema } from "../types";
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