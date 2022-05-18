// export const apiUrl = "http://localhost:3000"
export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000"
console.log("Current API URL:", apiUrl);
console.log("process.env.REACT_APP_API_URL:", process.env.REACT_APP_API_URL);