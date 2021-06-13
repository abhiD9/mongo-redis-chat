import React from 'react';
import './ChatCardsListing.scss'
import  ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { shortFormatTime } from "../../utils/helper";
import { NavLink } from "react-router-dom";
import { Avatar } from '@material-ui/core';

function ChatCardsListing({friendsList}) {
    console.log(friendsList);

    const renderRecentMsg = (data) => {
        let msg = "";
        if(data.recentMsg && data.recentMsg.msg) {
            if(data.recentMsg.msg.type === "message") {
                msg = data.recentMsg.msg.value;
            } else if (data.recentMsg.msg.type === "file") {
                msg = "Media shared";
            } else if (data.recentMsg.msg.type === "typing") {
                msg = <i style={{color: "#a7a7a7"}}>typing</i>
            } else {
                msg = "";
            }
        }
        return msg;
    }

    return (
        <div className="chat-cards-listing">
        {Object.keys(friendsList).map((key) => (
        <NavLink key={key} className="note-card" to={`/${key}`}>
          <div className="card">
            <div className="img-container">
              {friendsList[key].profileImg ? (
                <Avatar  src={friendsList[key].profileImg} />
              ) : (
                <Avatar />
              )}
            </div>
            <div className="card-detail">
              <h4 className="title">{friendsList[key].name}</h4>
              <p className="desc">{renderRecentMsg(friendsList[key])}</p>
            </div>
            <div className="time">
              {friendsList[key].recentMsg &&
                shortFormatTime(friendsList[key].recentMsg.time)}
            </div>
            <div className="action-btn">
              <ArrowDownIcon />
            </div>
          </div>
        </NavLink>
      ))}
            
        </div>
    )
}

export default ChatCardsListing
