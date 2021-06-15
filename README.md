## Hello there, Welcome to the MongoChat app.⚡ 

### Stack used: React Redis Express MongoDB


### Services & third-parties: MaterialUI SocketIO Multer

    Front-End: Functional based components and Context-api for state Management
    Back-End: MongoDB, Redis(just as a caching-layer to store user entering and leaving rooms)
    REACT - HTML, SCSS
    material-ui - for icons with ripple effect  
    Axios - HTTP requests client
    react-cookie - to store user and some other data
    moment - formatting time
    contextApi and reducers - Managing global state
    socket.io-client
    react mic

### Features and Description :
This is another clone of WhatsApp but with additional features like media sharing like image files and audio too.
App shows whether is user is online offline, last seen, last message shared in messages list and shows when the user is typing all in real-time.
This one is bit unique as it uses mongoDb's native queries against what we usually do with mongoose, Hence a better look into the native methods. Live not available due to some limitations on the free tiers. But the app works just fine on localhost.

## Run the project Locally:
After cloning the repository 
Install the dependencies
1. cd frontend - yarn install
2. cd backend - npm i
3. now run the project with yarn dev
4. All good. Your project must be up and running at http://localhost:3000

### Project Flow
User Can Join the Chat By Entering Random username (example user1) and also upload and image for profile pic

Open another window, probably side by side to take a look at features like another user typing online offline etc and  Join the Chat as another User (example user2)

In the user1 window send msg to user2 and check in user2 window the message popups
You can send images and audio file too.