import React from "react"
import { Link } from "gatsby"
import { Hierarchical } from "../types"

interface Props {
  pages: Array<Hierarchical>
}

const SidebarNav: React.FC<Props> = ({ pages }) => {
  return (
    <nav id="pageNav" role="navigation" className="page-sidebar-widget">
      <ul className="nav flex-column">
        {pages.map(({ id, link, menuTitle }) => {
          return (
            <li key={id} className="nav-item $LinkingMode">
              <Link className="nav-link" to={link}>
                {menuTitle}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SidebarNav
