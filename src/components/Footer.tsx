import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Menuable } from "../types"

const Footer: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allSsSiteTreeInterface(filter: { parentID: { eq: 0 } }) {
        nodes {
          menuTitle
          id
          link
        }
      }
      ssSiteConfig {
        title
      }
    }
  `)
  const links: Array<Menuable> = data.allSsSiteTreeInterface.nodes
  const siteTitle = data.ssSiteConfig.title

  return (
    <div className="container">
      <div className="row justify-content-between">
        <nav
          className="footer-nav-links col-auto"
          aria-label="Footer"
          role="navigation"
        >
          {links.map(({ link, id, menuTitle }) => {
            return (
              <Link key={id} to={link}>
                {menuTitle}
              </Link>
            )
          })}
        </nav>
        <div className="footer-nav-links footer-social-links col-auto">
          <a href="http://www.twitter.com" rel="noreferrer" target="_blank">
            Follow us on Twitter
          </a>
          <a href="http://www.facebook.com" rel="noreferrer" target="_blank">
            Follow us on Facebook
          </a>
        </div>
      </div>

      <hr className="mb-4 mt-4" />

      <div className="row justify-content-between">
        <div className="col-auto">
          <p>
            <small>
              &copy; {new Date().getFullYear()} {siteTitle}
            </small>
          </p>
        </div>
        <div className="col-auto">
          <a href="https://silverstripe.org/" className="footer-ss-logo">
            <StaticImage
              src="../images/silverstripe-logo.png"
              width={210}
              alt="Made by Silverstripe"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
