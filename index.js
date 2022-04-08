const apiKey="124ebbcded9f53e4f4dc4fd0a57674f8";
const popularMovieDiv= document.querySelector("#popular-movies");
const topRatedMovieDiv= document.querySelector("#top-rated-movies");
const searchedMovieDiv= document.querySelector("#searched-movies");
const searchBtn=document.querySelector("button");
const modal= document.querySelector("#simple-modal");
const modalContent=document.querySelector(".modal-content");
const modalCloseBtn=document.querySelector("#close-modal-btn");

modalCloseBtn.onclick=()=>{
    modal.style.display="none";
    searchedMovieDiv.innerHTML="";
}


window.onclick= (event)=>{
    if(event.target==modal){
        modal.style.display="none";
        searchedMovieDiv.innerHTML="";
    }
}

const getPopularMovie= async ()=>{
    try{
    const res1 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    let popularMovies =res1.data.results;
    createTile(popularMovies,popularMovieDiv);
    }
    catch(err){
        badApi(popularMovieDiv);
        console.log(err);
    }
}

const getTopRatedMovie= async()=>{
    try{
    const res2 =await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
    let topRatedMovies = res2.data.results;
    createTile(topRatedMovies,topRatedMovieDiv);
    }
    catch(err){
        badApi(topRatedMovieDiv);
        console.log(err);
    }
}

function createTile(movies,section){
    for (const movie of movies) {
        let newdiv=document.createElement("div");
        let newImg=document.createElement("img");
        let titleDiv=document.createElement("div");
        let h3= document.createElement("h3");
        let p1 =document.createElement("p");
        let p2=document.createElement("p");
        newdiv.setAttribute("class", "movie-tile");
        newImg.setAttribute("class","movie-img");
        titleDiv.setAttribute("class", "title-div");
        h3.setAttribute("class","movie-title");
        if(movie.poster_path===null){
            newImg.src="http://www.mnit.ac.in/StaffPhDPortal/images/staff/default.jpg"
            newImg.style.height="275px";
            newImg.style.width="180px";
        }
        else{
            newImg.src=`https://image.tmdb.org/t/p/w185/${movie.poster_path}`
        }
        
        h3.innerHTML=movie.title;
        p1.innerHTML=movie.vote_average;
        p2.innerHTML=movie.release_date;
        newdiv.appendChild(newImg);
        titleDiv.appendChild(h3);
        titleDiv.appendChild(p1);
        titleDiv.appendChild(p2);
        newdiv.appendChild(titleDiv);
        section.appendChild(newdiv);
    }
}

const badApi = (sectionName)=>{
    sectionName.innerHTML="404 Bad Request";
}

const getSearchedMovie= async()=>{
    const searchTerm= document.querySelector("input").value;
    document.querySelector("input").value="";
    try{
    const res3= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1`);
    const searchedMovies=res3.data.results;
    // console.log(searchedMovies);
    createTile(searchedMovies, searchedMovieDiv);
    document.getElementById("search-title").innerHTML=searchTerm;
    }
    catch(err){
        badApi(searchedMovieDiv);
        console.log(err);
    }

}



getPopularMovie();
getTopRatedMovie();


searchBtn.addEventListener("click", async()=>{
    await getSearchedMovie();
    modal.style.display="block";
    
});
