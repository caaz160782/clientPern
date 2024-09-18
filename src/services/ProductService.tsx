type ProductData={
    [k: string]: FormDataEntryValue;
}


export async function addProduct(data:ProductData) {
    console.log('desde add product',data)
}