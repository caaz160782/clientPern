import { Form, useNavigate,ActionFunctionArgs,redirect} from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProductByID } from "../services/ProductService"


export async function action({params}:ActionFunctionArgs) {
  if(params.id !== undefined){
    await deleteProductByID(+params.id)
    return redirect('/')
  } 
}

type ProductDetailsProps={
  product: Product
}


 
export default function ProductDetails({product}:ProductDetailsProps) {
  
  const navigate = useNavigate();

  const isAvailable = product.availability

  return (
    <tr className="border-b ">
    <td className="p-3 text-lg text-gray-800">
      {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
      {formatCurrency(product.price)}
    </td>
    <td className="p-3 text-lg text-gray-800">
      {isAvailable ?'Disponible':'No Disponible'}
    </td>
    <td className="p-3 text-lg text-gray-800 ">
       <div className="flex gap-2 items-center">
          {/* <Link 
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            to={`productos/${product.id}/edit`}
          >
             Editar</Link> */}
          <button 
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            onClick={()=>navigate(`productos/${product.id}/edit`,{ state:{ product}})}
          >
             Editar</button>
           <Form 
             className="w-full" 
             method="POST" 
             action={`productos/${product.id}/delete`}  
           >
            <input 
               className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
               type="submit"
               value='Eliminar'
               />
            
           </Form>  
       </div>
    </td>
</tr> 
  )
}
