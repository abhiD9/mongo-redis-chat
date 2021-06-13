import { Avatar, Button } from '@material-ui/core'
import React, {useContext} from 'react'
import './ProfileSection.scss'
import AuthContext from '../../context/AuthContext'

function ProfileSection({ handleLogout }) {
    const userObj = useContext(AuthContext)
    const { profileImg, name } = userObj;
    return (
        <div className="profile-section ">
           <div className="img-container">
               <Avatar  src={profileImg}/>
           </div>{name}
           <Button variant="outlined" onClick={handleLogout} className="action-items">
               Logout
           </Button>
        </div>
    )
}

export default ProfileSection
