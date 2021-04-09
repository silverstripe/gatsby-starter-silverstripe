import * as React from "react"
import SEO from "../components/seo"
import { graphql } from 'gatsby';
import Menu from "../components/Menu";

const Page = ({ data: { ssSiteTreeInterface: { title, content} }}) => (
  <div>
    <SEO title={title} />
    <Menu />
    <h1>{title} (Page)</h1>
    <div dangerouslySetInnerHTML={{__html: content}} />
  </div>
)

export const query = graphql`
  query($id: String!) {
    ssSiteTreeInterface( id: {eq: $id }) {
        title
        content
    }
  }
`;

export default Page;
