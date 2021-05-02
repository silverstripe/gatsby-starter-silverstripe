import React from "react"
import { Element } from "./ElementalArea"

interface Props {
  element: Element
}
const ElementContent: React.FC<Props> = ({
  element: { showTitle, html, title },
}) => {
  const content = html as string

  return (
    <div className="content-element__content">
      {showTitle && <h2 className="content-block__title">{title}</h2>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default ElementContent
