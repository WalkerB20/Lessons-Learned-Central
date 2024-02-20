import {useAuth0} from '@auth0/auth0-react'
//import {ProfileBox, Image, P} from './Styles';

export default function Profile () {
const {user, isAuthenticated} = useAuth0()
  return(
    isAuthenticated && (
      <>
        <Image src={user.picture} alt={user.name}/>
        <P>Name: {user.name}</P>
        <P>Username: {user.nickname}</P>
        <P>Email: {user.email}</P>
      </>
    )
  )
}