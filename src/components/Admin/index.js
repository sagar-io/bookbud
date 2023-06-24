import withAuthorization from "../Session/withAuthorization"
import { withFirebase } from "../Firebase"
import { useEffect, useState } from "react"

const Admin = (props) => {
    const [usersRecord, setUsersRecords] = useState({
                                              users: [],
                                              loading: true
                                            })
    const {users, loading} = usersRecord

    useEffect(() => {
       const listener = props.firebase.readDataFromDB(handleUsersObj, "users/")
       return () => listener()
    }, [])

    function handleUsersObj(snapshot){
      const usersObj = snapshot.val()
      const usersArr = Object.keys(usersObj).map(uid => ({
        ...usersObj[uid],

        uid: uid
      }))
      setUsersRecords({users: usersArr, loading: false})
    }

    const usersElement = users.map(user => (
       <div key={user.uid}>
         <span>{user.userName}</span>
         <span>{user.email}</span>
       </div>
    ))

    return (
        <div>
          <h1 style={{textAlign: 'center'}}>You're not a Admin</h1>
         {/* <h1>Admin</h1>
          {loading && <p>Loading...</p>}

       <div>
          <div>
            <strong style={{paddingRight: '0.2rem'}}>UserName</strong>
            <strong>Email</strong>
          </div>
          {usersElement}
       </div> */}
      </div>
    )
}
const users = (uid) => (
    <div key={uid}>

    </div>
)

const condition = authUser => 
  // authUser && authUser.roles.includes(ROLES.ADMIN)
  authUser != null

export default withAuthorization(condition)(withFirebase(Admin))