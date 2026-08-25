import { useState, createContext } from 'react'

export const UserContextData = createContext()

const UserContext = ({children}) => {

   const [userData,setUserData] = useState()
    
  return (
      <UserContextData value={{userData,setUserData}}>
          {children}
      </UserContextData>
  ) 
}

export default UserContext