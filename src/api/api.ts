import axios from "axios";

const apiKey = "AIzaSyC_Ok_CtARF8l_8HSkdG4t0HhLtOomYD5Y";

export const instance = axios.create({
  // withCredentials: true,
  baseURL: "https://www.googleapis.com/books/",
  // headers: {
  //    "API-KEY": "AIzaSyC_Ok_CtARF8l_8HSkdG4t0HhLtOomYD5Y"
  // }
});

export const getBooksApi = (
  searchParameter = "",
  category = "*",
  orderBy = "relevance",
  startIndex = 0,
  maxResults = 30
) => {
  if (category === "all") {
    category = "*";
  }
  try {
    return instance.get(
      `v1/volumes?q=${searchParameter}+subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}&key=${apiKey}`
    );
  } catch (error) {
    window.alert(error);
  }
  
};

//    https://www.googleapis.com/books/v1/volumes?q=java+subject:*&startIndex=0&maxResults=10&orderBy=relevance&key=AIzaSyC_Ok_CtARF8l_8HSkdG4t0HhLtOomYD5Y
