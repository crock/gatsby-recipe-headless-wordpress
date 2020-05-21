import React from 'react'
import { graphql } from 'gatsby'

const UserTemplate = ({data}) => {
    const { name, description, url, avatar_urls } = data.wordpressWpUsers

    return <>
        <div className="user" style={{display: 'flex', flexDirection: 'column'}}>
            Author Avatar: <img src={avatar_urls.wordpress_96} alt={`${name}'s Avatar`} />
            Author Name: <h1 dangerouslySetInnerHTML={{ __html: name }}></h1>
            Author Bio: <div className="bio" dangerouslySetInnerHTML={{ __html: description }}></div>
            Author Homepage: <a className="btn-external" href={url} target="new">External Link</a>
        </div>
    </>
} 

export const query = graphql`
  query UserQuery($slug: String!) {
    wordpressWpUsers(slug: { eq: $slug }) {
        id
        description
        name
        slug
        url
        wordpress_id
        avatar_urls {
          wordpress_24
          wordpress_48
          wordpress_96
        }
    }
  }
`

export default UserTemplate