import * as React from "react"
import SEO from "../components/seo"
import { graphql } from 'gatsby';
import Menu from "../components/Menu";

const ProductPage = ({ data: { ssProductPage: { title, content, products } }}) => (
  <div>
    <SEO title={title} />
    <Menu />
    <h1>{title} (Page)</h1>
    <div dangerouslySetInnerHTML={{__html: content}} />
    <ul>
        {products.map(product => (
            <li key={product.id}>{product.title} ${product.price}</li>
        ))}
    </ul>
  </div>
)

export const query = graphql`
  query($id: String!) {
    ssProductPage( id: {eq: $id }) {
        title
        content
        products {
            id
            title
            price
        }
    }
  }
`;

export default ProductPage;
