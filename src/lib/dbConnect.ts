import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number;
  };

const connection: ConnectionObject = {};

//void here simply means that we dont care about the data that is coming
async function dbConnect(): Promise<void> {
    //since it is a edge time framework so we need to check ki pehle se hi connection bana hua hai ki naya banana hai

    if (connection.isConnected) {
        console.log('Already connected to the database');
        return;
      }

      try {
         // Attempt to connect to the database
        const db = await mongoose.connect(process.env.MONGODB_URI || '');

        console.log('db object:', db)
        console.log('typical thing:', db.connection.host)

        connection.isConnected = db.connections[0].readyState;
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
      }
}

export default dbConnect