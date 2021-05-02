import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { Hierarchical } from "../types"

const MainNav = () => {
  const data = useStaticQuery(graphql`
    query {
      allSsSiteTreeInterface(filter: { parentID: { eq: 0 } }) {
        nodes {
          menuTitle
          id
          link
          childNodes {
            ... on SS_SiteTreeInterface {
              menuTitle
              id
              link
            }
          }
        }
      }
    }
  `)
  const mainNav: Array<Hierarchical> = data.allSsSiteTreeInterface.nodes
  return (
    <div className="main-nav">
      <nav
        className="navbar navbar-expand-md navbar-light bg-white"
        aria-label="Main"
        role="navigation"
      >
        <div className="container">
          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav">
              {mainNav.map((node, i) => {
                const isCurrent = false //location.pathname === node.link;
                const firstLast =
                  i === 0 ? `first` : i === mainNav.length - 1 ? `last` : ``
                const linkingMode = isCurrent ? `active` : ``
                const { id, childNodes, menuTitle, link } = node
                const hasChildren = childNodes.length > 0
                return (
                  <li
                    key={id}
                    className={`nav-item ${firstLast} ${linkingMode} ${
                      childNodes.length ? `dropdown` : ``
                    } `}
                  >
                    <Link role="menuitem" to={link} className="nav-link">
                      {menuTitle}
                    </Link>
                    {hasChildren && (
                      <>
                        <button
                          className="btn btn-link float-right navbar-touch-caret"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-toggle="dropdown"
                        >
                          <span className="sr-only">
                            Display {childNodes.length} submenu pages
                          </span>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <ul className="dropdown-menu" aria-hidden="true">
                          {childNodes.map(({ id, link, menuTitle }) => {
                            const isCurrent = false //location.pathname === link;
                            const linkingMode = isCurrent ? `active` : ``
                            return (
                              <li className={`${linkingMode}`} key={id}>
                                <Link
                                  className="dropdown-item"
                                  role="menuitem"
                                  to={link}
                                >
                                  {menuTitle}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MainNav
