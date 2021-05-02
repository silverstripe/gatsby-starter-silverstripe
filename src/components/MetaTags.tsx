import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Meta {
  property?: string
  name?: string
  content: string
}

interface Props {
  description?: string
  lang?: string
  meta?: Array<Meta>
  title: string
}

const MetaTags: React.FC<Props> = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  const metaTags: Array<Meta> = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.author || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    ...meta,
  ]

  return (
    <Helmet titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}>
      <html lang={lang} />
      <title>{title}</title>
      {meta.map(({ property, name, content }) => {
        return property ? (
          <meta
            key={`${property}-${content}`}
            property={property}
            content={content}
          />
        ) : (
          <meta key={`${name}-${content}`} name={property} content={content} />
        )
      })}
    </Helmet>
  )
}

MetaTags.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default MetaTags
