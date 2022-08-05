import { useQuery } from '@apollo/client'
import  { 
  GetCategoryByUrlKeyDocument, 
  GetCategoryByUrlKeyQuery, 
  GetCategoryByUrlKeyQueryVariables, 
  GetProductsByCategoryDocument, 
  GetProductsByCategoryQuery, 
  GetProductsByCategoryQueryVariables
} from '../generated'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { ReactElement } from 'react'
 

const ProductList = () => {
  
  const router = useRouter();
  const { url_key } = router.query; 
  const { data: catdata, error: caterror, loading: catloading } = useQuery<GetCategoryByUrlKeyQuery, GetCategoryByUrlKeyQueryVariables>(GetCategoryByUrlKeyDocument, 
    {
      variables:  { urlKeys: url_key }
    });
 
  const category_id =catdata ? catdata.categories.items[0].uid : ''; 
  const category_name =catdata ? catdata.categories.items[0].name : ''; 


  const { data, error, loading } = useQuery<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(GetProductsByCategoryDocument, 
    {
      variables:  { id: category_id }
    });
    
  if(loading) 
  return (
    <div>Loading</div>
  )
  if(error) 
  return (
    <div>Loading</div>
  )


  return (
      <div className="content-body">
        <h1 className="h1">Shop your favorite  <b>{category_name}</b> products</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.products.items.map((product: any) => {
          return (
            <div className="mx-2 border-dotted border-2 border-indigo-600 p-4">
            <div key={product.uid} className="text-blue-200 font-semibold">{product.name}</div>
            <div className="text-center"  style={{border: "1px solid gray", margin: "20px 0"}} ><Image src={product.image.url} width="200px" height="200px"  /></div>
            <div className="text-center"><Button variant="filled" className="mt-8">Add to cart</Button></div>
     
          </div>
          )
        })} 
        </div>
    </div>
  )
}

ProductList.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default ProductList
