import * as React from "react"
import { graphql } from "gatsby"
import SidebarNav from "../components/SidebarNav"
import Breadcrumbs from "../components/Breadcrumbs"
import ElementalArea from "../elements/ElementalArea"
import PageLayout from "../layouts/PageLayout"
import MetaTags from "../components/MetaTags"
import { Hierarchical } from "../types"
import type { Element } from "../elements/ElementalArea"

interface Props {
  data: {
    ssSiteTreeInterface: {
      title: string
      content: string
      childNodes: Array<Hierarchical>
      breadcrumbs: Array<Hierarchical>
      elementalArea?: {
        elements: Array<Element>
      }
    }
  }
}
const Page: React.FC<Props> = ({
  data: {
    ssSiteTreeInterface: {
      title,
      content,
      childNodes,
      breadcrumbs,
      elementalArea,
    },
  },
}) => (
  <PageLayout>
    <div className="container">
      <MetaTags title={title} />
      <div className="row">
        <section
          className={
            childNodes.length > 0 ? `col-lg-12` : `col-lg-8 offset-lg-2`
          }
        >
          <header className="page-header">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1>{title}</h1>
          </header>
        </section>
      </div>
      <div className="row">
        <section
          className={`col-lg-8 ${!childNodes.length ? `offset-lg-2` : ``}`}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {elementalArea && <ElementalArea elements={elementalArea.elements} />}
        </section>
        {childNodes.length > 0 && (
          <aside className="col-lg-3 offset-lg-1">
            <SidebarNav pages={childNodes} />
          </aside>
        )}
      </div>
    </div>
  </PageLayout>
)

export const query = graphql`
  query($id: String!) {
    ssSiteTreeInterface(id: { eq: $id }) {
      title
      content
      childNodes {
        ... on SS_SiteTreeInterface {
          id
          menuTitle
          link
        }
      }
      breadcrumbs {
        id
        menuTitle
        link
      }

      # If using elemental, uncomment this

      # elementalArea {
      #   elements {
      #      ... on SS_BaseElementInterface {
      #        __typename
      #        id
      #        showTitle
      #        title
      #      }
      #      ... on SS_ElementContent {
      #        html
      #      }
      #   }
      # }
    }
  }
`

export default Page
