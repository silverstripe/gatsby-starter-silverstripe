import * as React from "react"
import SEO from "../components/SEO"
import { graphql } from 'gatsby';
import Breadcrumbs from "../components/Breadcrumbs";
import PageLayout from "../layouts/PageLayout";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductPage = ({
  data: {
    ssProductPage: {
      title,
      breadcrumbs,
      content,
      products,
    } 
  }
}) => (
  <PageLayout>
    <div className="container"> 
      <SEO title={title} />
      <div className="row">
          <section className={`col-lg-8 offset-lg-2`}>
              <header className="page-header">
                  <Breadcrumbs breadcrumbs={breadcrumbs} />
                  <h1>{title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                  {products.map(product => {
                    const image = getImage(product.image.localFile);
                    return (
                      <div key={product.id}>
                        <h3>{product.title} ${product.price}</h3>
                        {image && <GatsbyImage image={image} alt="image" />}
                      </div>
                    );
                  })}
              </header>
          </section>
      </div>
    </div>
  </PageLayout>
);

export const query = graphql`
  query($id: String!) {
    ssProductPage( id: {eq: $id }) {
        title
        content
        breadcrumbs {
          id
          menuTitle
          link
        }
        products {
          id
          title
          price
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 200)
              }
            }
          }
        }
    }
  }
`;

export default ProductPage;
