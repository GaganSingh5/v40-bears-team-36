import dotenv from 'dotenv';


if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

const envVariables = {
  API_Key: process.env.Api_Key
}

export default envVariables;
