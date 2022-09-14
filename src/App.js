//import 'semantic-ui-css/semantic.min.css'
import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import { Input, Form, Icon, Button, Container } from 'semantic-ui-react'
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=5ea7440f';



const App = () => 
{
    const [movies, setMovies] = useState([])        //Mainly used for retrieving data from the back end and ultimately displaying them 
    const [search, setSearch] = useState('')        //Mainly used for just typing up on the search bar
    
    const handleChange = (event) => {
        setSearch(event.target.value)       //search has the value of the event.target.value passed in
               console.log(search) 
    }

    const handleMovieChange = (event) => {
        SearchMovies(search)    //calls the SearchMovies function & passes the search state variable that's dynamically changed when you search a movie up 
                                //which gets data from the back end and passes it in movies state variable via the setMovies() setter in the last line
                                //which is ultimately displayed in css
    }

    const SearchMovies = async(title) =>{
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        setMovies(data.Search); //storing the data from the api call in the setMovies hook
    }

    useEffect(()=>{
        SearchMovies(`Spiderman`)
    },[]);

  
    return(
        <div className="app">       {/*calling the .app style from the App.css*/ }
            <h1>MovieLand</h1>
          
            <Form.Input
              size='massive'
              placeholder='Search for Movies'
              value={search}
              onChange={handleChange}     //look at how the value attribute is coded for elements in the chakra ui docs
              icon={<Button 
                    icon='find' 
                    onClick={handleMovieChange} //look at how the values coded for elements in the chakra ui docs
                    />}
            />
           
        {
            movies.length>0
            ?(
                <div className="container">  {/*calling the .container style from the App.css*/ }
                  { //Dynamically looping through the movies state array that holds all the movies info & passes them as props to the MovieCard func 
                      movies.map((movie)=>(
                        <MovieCard movie1 = {movie}/>     //passing every element in the state variable array as the iterator iterates through the array and passing them as props into the MovieCard function
                      ))
                  }
                </div>
            ) : (

                <div className="empty">
                    <h2>No Movies found</h2>
                </div>
            )
        }        
           
        </div>
    );
}

export default App;