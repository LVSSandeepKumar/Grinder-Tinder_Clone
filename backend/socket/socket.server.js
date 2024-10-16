import { Server } from "socket.io";

let io;

//Create an empty map to save connected Users
const connectedUsers = new Map();

//Function to initialize socket
export const initializeSocket = (httpServer) => {
    //Initialize new io server on existing http server
    io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  //Set userId to socket userId
  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return next(new Error("Invalid User Id"));

    socket.userId = userId;
    next();
  });
  
  //Listen for connections and save the connectedUsers to the map
  io.on("connection", (socket) => {
    console.log(`User connected with socketId : ${socket.id}`);
    connectedUsers.set(socket.userId, socket.id);
    //On disconnection, remove the users from map
    socket.on("disconnect", () => {
      console.log(`User disconnected with socket id : ${socket.id}`);
      connectedUsers.delete(socket.userId);
    });
  });
};

//Helper functions below

//Function to getIO
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
};

//Function to get connected users
export const getConnectedUsers = () => connectedUsers;
