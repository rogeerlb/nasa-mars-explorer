const api_key = process.env.REACT_APP_API_KEY

export const getApiUrl = () => {
  return {
    url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?",
    api_key: api_key,
  }
}
