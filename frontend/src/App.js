import './App.scss';
import { useEffect, useReducer, useState } from 'react';
import { useCookies } from 'react-cookie';

import ProfileSection from './components/ProfileSection/ProfileSection';
import SearchPeople from './components/SearchPeople/SearchPeople';
import ChatCardsListing from './components/ChatCardsListing/ChatCardsListing';
import ChatSection from './components/ChatSection/ChatSection';
import Login from './components/Login/Login';
import { BASE_URL, LOGIN, USER_LIST } from './utils/apiEndpoints'
import { getRequest, postRequest } from './utils/apiRequests'
import AuthContext from './context/AuthContext'
import SocketContext from './context/SocketContext'
import io from "socket.io-client";
import friendsListReducer from './reducer/friendsListReducer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const initialState = {};
const socket = io.connect("http://localhost:5000", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
});


function App() {
  const [cookies, setCookie, removeCookie]  = useCookies(["whatsappclone"])
  const [error, setError] = useState(null);
  const [recentMsg, setRecentMsg] = useState({});
  const [recentOnlineFriend, setRecentOnlineFriend] = useState({});
  const [recentOfflineFriend, setRecentOfflineFriend] = useState({});
  const [userObj, setUserObj] = useState(() => {
    return cookies.user
  })
  const [friendsList, friendsListDispatch] = useReducer(
    friendsListReducer, initialState
  )

  useEffect(() => {
    if(userObj && userObj.sessionId){
      joinUser(userObj);
      getFriendsList(userObj)
    }
  }, [])

  const handleLogin = async(userData) => {
    const formData = new FormData();
    if(userData.file) {
      formData.append("profileImg", userData.file, userData.file.name);
    }
    formData.append("payload", JSON.stringify({name: userData.name}))
    const response = await postRequest(`${BASE_URL}${LOGIN}`, formData);
    console.log(response);
    if(response.error){
      setError(response.error);
      return false;
    }
    setCookie("user", response)
    setUserObj(response)
    joinUser(response)
    getFriendsList(response)
  }

  const handleLogout = () => {
    socket.emit("logout-user", userObj.sessionId, (cbData) => {
      console.log("user removed");
    })
    removeCookie("user");
    setUserObj(null);
    setError(null)
  }

  const getFriendsList = async(userData) => {
    const response = await getRequest(
      `${BASE_URL}${USER_LIST}/${userData.sessionId}`
    );
    if(response.error) {
      setError(response.error);
      return false;
    }
    friendsListDispatch({type: "FRIENDS", payload: response});
    onLineOffLineUser();
  }

  const onLineOffLineUser = () => {
    socket.on("new-online-user", (data) => {
      friendsListDispatch({type: "NEW_FRIEND", payload: data})
      console.log(data);
      setRecentOnlineFriend(data)
    });
    socket.on("new-offline-user", (data) => {
      setRecentOfflineFriend(data);
    })
  }

  const joinUser = (userData) => {
    let initData = {
      createdAt: userData.createdAt,
      name : userData.name,
      profileImg: userData.profileImg,
      sessionId: userData.sessionId,
      updatedAt: userData.updatedAt,
      _id: userData._id
    }
    socket.emit("join-user", initData, (cbData) => {
      console.log("user Joined");
    })

    socket.on("receive-msg", (data) => {
      console.log("user joined");
      updateRecentMsg(data);
      setRecentMsg(data)
    })

    socket.on("user-typing", (data) => {
      console.log(data);
      updateRecentMsg(data)
    })
  }

  const updateRecentMsg = (data) => {
    friendsListDispatch({type: "RECENT_MSG", payload: data})
  }

  return (
    <>
    {!(userObj && userObj.sessionId) ? (
      <Login handleLogin={handleLogin} responseError={error}/>
    ) : (
      <AuthContext.Provider value={userObj}>
        <SocketContext.Provider value={socket}>
    <div className="App">
    <Router>
       <div className="sidebar">
        <ProfileSection handleLogout={handleLogout}/>
        <SearchPeople/>
        <ChatCardsListing friendsList={friendsList}/>
       </div>
       <Switch>
            <Route path="/:id">
       <div className="chats__Section">
        <ChatSection
         updateRecentMsg={updateRecentMsg}
         recentMsg={recentMsg}
         recentOnlineFriend={recentOnlineFriend}
         recentOfflineFriend={recentOfflineFriend}
         />
       </div>
       </Route>
      </Switch>
    </Router>
    </div>
    </SocketContext.Provider>
    </AuthContext.Provider>
    )}
    </>
  );
}

export default App;
