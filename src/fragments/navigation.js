import { graphql } from "gatsby"

export const query = graphql`
  fragment navigation on SS_SiteTreeInterface {
    menuTitle
    link
    id
  }
`
