import MoreVertIcon from '@material-ui/icons/MoreVert';
import  { Avatar, IconButton } from '@material-ui/core';
import React from 'react'
import './ChatHeader.scss';
import { formatDate } from '../../utils/helper';
function ChatHeader({friendInfo}) {
    const { isOnline, profileImg, name, updatedAt } = friendInfo;
  return (
    <div className="chat-header">
      <div className="img-container">
        {profileImg ? (
          <img
          alt="profile"
          src={profileImg}
        />
        ) :
        <Avatar className="icon-block" /> }
      </div>
      <div className="card-detail">
          <h4 className="title">{name ? name : ""}</h4>
          <p className="desc">
            {isOnline ? "Online" 
            : `Last seen ${updatedAt ? formatDate(updatedAt) : ""}`}
          </p>
      </div>
      <div className="acion-items">
          <IconButton>
              <MoreVertIcon/>
          </IconButton>
          
      </div>
    </div>
  );
}

export default ChatHeader
