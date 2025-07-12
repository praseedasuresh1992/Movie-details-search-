const search = document.getElementById('search')
const movieDetails = document.getElementById('movieDetails')
const errorContainer = document.getElementById('error')

search.addEventListener('click', async () => {
    movieDetails.innerHTML = ""
    const movieName = document.getElementById('movieName').value
    console.log(movieName)

    if (movieName == "") {
        alert("Please Enter The movie name")
    }
    const apiKey = "ca2946c0"
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.Search.forEach(movie => {
                const detailedUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
                fetch(detailedUrl)
                    .then(response => response.json())
                    .then(det => {
                        console.log(det)
                        const listOfmovie = document.createElement('div')
                        listOfmovie.id = "listmovie"
                        listOfmovie.innerHTML = `
                <img src="${det.Poster}" alt="image of movie"/>
                <h3 id="title"> ${det.Title}</h3>
                <p id="year">Released in :${det.Released}</p>
                <p id="plot">Plot Summary:${det.Plot}</p>
                `;
                        movieDetails.appendChild(listOfmovie)

                    })
            })

        })

        .catch(err => {

            console.error("Error is Displayed :", err.message)
            errorContainer.textContent = "something went wrong"

        })
})


