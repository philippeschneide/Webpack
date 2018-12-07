import React from "react"
import "../css/Article.css"
import NotFound from "./NotFound"

export default props => {
  try {
    const MarkdownData = require(`../../data/${props.site}/${
      props.params.slug
    }.md`)
    const billboardStyle = {
      backgroundImage: `url(${MarkdownData.posterImage})`
    }
    return (
      <div className="Article">
        <div className="billboard" style={billboardStyle} />
        <h1>{MarkdownData.title}</h1>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}
        />
      </div>
    )
  } catch (error) {
    return <NotFound />
  }
}
