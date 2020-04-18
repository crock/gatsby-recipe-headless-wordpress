import React from 'react'
import { graphql } from 'gatsby'
import '../styles/user.css'

const UserTemplate = ({data}) => {
    const { firstName, lastName, username, description, url, avatar } = data.wordpress.user
    const name = `${firstName} ${lastName} (@${username})`

    return <>
        <div className="user">
            <img src={avatar.url} alt={`${name}\'s Avatar`} />
            <h2 dangerouslySetInnerHTML={{ __html: name }}></h2>
            <div className="bio" dangerouslySetInnerHTML={{ __html: description }}></div>
            <a className="btn-external" href={url} target="new">External Link</a>
        </div>
    </>
} 

export const query = graphql`
  query UserQuery($id: ID!) {
    wordpress {
      user(id: $id, idType: DATABASE_ID) {
        avatar {
          url
        }
        firstName
        lastName
        username
        url
        description
      }
    }
  }
`

export default UserTemplate