import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import SkipLinks from "./SkipLinks"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      ssSiteConfig {
        title
        tagline
      }
    }
  `)
  const {
    ssSiteConfig: { title, tagline },
  } = data
  return (
    <div className="container site-header clearfix">
      <SkipLinks />
      <div className="site-header-brand">
        <Link
          title="Go to Home Page"
          className="site-header-brand-link-default"
          to="/"
        >
          <span>{title}</span>
        </Link>
        {tagline && (
          <span className="site-header-brand-tagline">{tagline}</span>
        )}
      </div>
      <div className="navbar-expand-md navbar-light">
        <button
          className="navbar-toggler float-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  )
}

export default Header
