const { MongoClient } = require("mongodb");
require('dotenv').config();

const connectDB = async () => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error("Database URL not found in environment variables");
  }

  try {
    const client = await MongoClient.connect(dbUrl, {
      tls: true,
      tlsAllowInvalidCertificates: true, // Use with caution, only for development/testing
      serverSelectionTimeoutMS: 5000 // Optional: to prevent hanging on connection attempts
    });
    console.log("DB Connected");
    return client.db(); // Return the db object for further usage
  } catch (error) {
    console.error("DB connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;
