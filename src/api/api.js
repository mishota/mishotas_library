import axios from "axios";
const apiKey = `?key="AIzaSyC_Ok_CtARF8l_8HSkdG4t0HhLtOomYD5Y"`;
const urlExample = `https://www.googleapis.com/books/v1/volumes?q=js?key="AIzaSyC_Ok_CtARF8l_8HSkdG4t0HhLtOomYD5Y"`;
export const instance = axios.create({
   // withCredentials: true,
   baseURL: 'https://www.googleapis.com/books/',
   // headers: {
   //    "API-KEY": "AIzaSyC_Ok_CtARF8l_8HSkdG4t0HhLtOomYD5Y"
   // }



});

// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor


// export const getBooks = (searchParameter: string): any => {
//    debugger;
//    return instance.get<any>(`v1/volumes?q=` + searchParameter)
//       .then(response => { return response.data });
// }
export const getBooksApi = (searchParameter = '', category = '*', orderBy = 'relevance', startIndex = 0, maxResults = 30) => { //newest 
   // return instance.get(`v1/volumes?q=${searchParameter}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}`);
   if (category === "all") {
      category = '*';
   }
   debugger;
   return instance.get(`v1/volumes?q=${searchParameter}+subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}`);
   //    .then(response => { return response.data });
   // https://www.googleapis.com/books/v1/volumes?q=js&startIndex=0&maxResults=10&orderBy=relevance

}

