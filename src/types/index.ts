import { array, boolean, InferOutput, number, object,string } from "valibot"


export const DraftProducSchema= object({
    name:string(),
    price: number()
})

export const ProducSchema= object({
    id:number(),
    name:string(),
    price: number(),
    availability:boolean()
})
export const ProductsSchema =array(ProducSchema)
export type Product = InferOutput<typeof ProducSchema>