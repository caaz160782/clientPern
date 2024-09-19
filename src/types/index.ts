import { number, object,string } from "valibot"


export const DraftProducSchema= object({
    name:string(),
    price: number()
})