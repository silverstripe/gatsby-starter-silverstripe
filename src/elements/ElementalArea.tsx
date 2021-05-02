import React from "react"
import ElementContent from "./ElementContent"

interface Props {
  elements: Array<{
    __typename: string
    id: string
  }>
}
// Todo: Support dynamic element components
const ElementalArea: React.FC<Props> = ({ elements }) => {
  return (
    <>
      {elements.map(element => {
        return (
          <div key={element.id}>
            <h3>{element.__typename}</h3>
            <ElementContent element={element} />
          </div>
        )
      })}
    </>
  )
}

export default ElementalArea
