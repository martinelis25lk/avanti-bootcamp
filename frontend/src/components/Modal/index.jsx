import "./style.css"

export function Modal({children, isVisible}) {
  return (
    <div className={isVisible ? "modal" : "modal hidden"}>
      {
        (children)
      }
    </div>
  )
}
