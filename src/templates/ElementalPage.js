import * as React from "react"
import SEO from "../components/seo"
import { graphql } from 'gatsby';
import Menu from "../components/Menu";

const ElementalPage = ({ data: { ssElementalPage: { title, content, elementalArea: { elements }} }}) => (
  <div>
    <SEO title={title} />
    <Menu />
    <h1>{title} (Elemental Page)</h1>
    <ul>
      {elements.map(element => (
        <li key={element.id}>{element.title}</li>
      ))}
    </ul>
    <div dangerouslySetInnerHTML={{__html: content}} />
  </div>
)

export const query = graphql`
  query($id: String!) {
    ssElementalPage( id: {eq: $id }) {
        title
        content
        elementalArea {
          elements {
            ... on SS_BaseElementInterface {
              title
              id
            }
            ... on SS_ElementContent {
              html
            }
          }
        }
    }
  }
`;

export default ElementalPage;
