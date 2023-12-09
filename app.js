let figures;
let figcaption = document.querySelector('.img-caption')
let detailsList = document.querySelector('.details-list')
let form = document.querySelector('form');
let input = document.querySelector('#input-text');
let main = document.querySelector('main');
let searchResultText = document.querySelector('h3');

let x = 0;
let z = 0;

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let searchTerm = form.elements.query.value;
    let y = x;
    z = z + 1;

    let i;

    function sliceText(text) {
        let textArr = Array.from(text);
        let newArr = [];

        for (let text of textArr) {
            if (text !== " ") {
                newArr.push(text);
            }
        }

        let result = newArr.join("");
        return result;
    }

    let searchTermClass = sliceText(searchTerm)


    try {
        const req = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)

        const shows = await req.json();

        i = 0;


        for (let show of shows) {
            if (show.show.image) {


                i++;

                let name = show.show.name;
                let language = show.show.language;
                let genres = Array.from(show.show.genres);
                let rating = show.show.rating.average;

                // creating Elements
                let figure = document.createElement('figure');
                let figcaption = document.createElement('figcaption');
                let img = document.createElement('img');
                let detailsList = document.createElement('ul')

                // creating Li Elements
                let liOne = document.createElement('li');
                let liTwo = document.createElement('li');
                let liThree = document.createElement('li');
                let liFour = document.createElement('li');

                // creating span Elements
                let spanOne = document.createElement('span');
                let spanTwo = document.createElement('span');
                let spanThree = document.createElement('span');
                let spanFour = document.createElement('span');

                img.src = show.show.image.original;
                //adding classes
                figure.className = `img-container ${name} ${searchTermClass}`;
                figcaption.className = "img-caption";
                detailsList.className = "details-list";

                // appending

                detailsList.append(liOne);
                detailsList.append(liTwo);
                detailsList.append(liThree);
                detailsList.append(liFour);

                spanOne.append(name);
                spanTwo.append(language);
                spanThree.append(genres);
                spanFour.append(rating);

                liOne.append(`NAME: `, spanOne);
                liTwo.append(`LANGUAGE: `, spanTwo);

                if (rating) {
                    liFour.append(`rating: `, spanFour);
                } else {
                    liFour.append(`rating: N/A`);
                }

                if (genres.length > 0) {
                    liThree.append(`genres: `, spanThree);
                } else {
                    liThree.append(`genres: N/A`);
                }

                figcaption.append(detailsList);
                figure.append(figcaption);
                figure.insertAdjacentElement('afterbegin', img);
                main.append(figure)

            } else {
            }
        }

        if (!(z - 1 === y)) {
            figures = document.querySelectorAll("figure");

            for (let figure of figures) {
                if (!(figure.classList.contains(searchTermClass))) {
                    figure.remove();
                }
            }
        }

        input.value = "";

        if (i != 0) {
            searchResultText.innerText = `(${i}) Search results for: ${searchTerm}`
        } else {
            searchResultText.innerText = "No search Results :("
        }

    } catch (e) {
        searchResultText.innerText = "ERROR 404! Check your internet connection :("
    }
})

