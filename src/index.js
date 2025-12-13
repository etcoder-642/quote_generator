import "./styles/main.css"

const mainBtn = document.querySelector('.main-btn');
const quoteSection = document.querySelector('.main-section');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const categories = document.querySelector('.categories');
const selectCategory = document.querySelector('.select-category');
const inputValue = document.querySelector('.input-value');
const bottomIcons = document.querySelector('.bottom-icons');
const quoteList = document.querySelector('.quote-list');
const likedQuotes = document.querySelector('.liked-quotes');
const heartIcon = document.querySelector('.heart-icon');
const bookmarkIcon = document.querySelector('.bookmark-icon');
let isLiked = false;
const quoteCollection = [];
const likedQuoteCollection = [];


// To save and display previously generated quotes
const displayQuotes = (array)=>{
    let list = document.createElement('li');
    list.classList.add('previous-quotes-list');

    let previousQuote = document.createElement('div');
    let quoteAuthor = document.createElement('div');
    previousQuote.classList.add('previous-quote');
    quoteAuthor.classList.add('quote-author');

    previousQuote.textContent = array[0];
    quoteAuthor.textContent = array[1];

    list.append(previousQuote, quoteAuthor);
    return list;
}

//.. To toggle between the solid and regular for the heart and bookmark icons

heartIcon.addEventListener('click', ()=>{
    heartIcon.classList.toggle('solid');
    isLiked = !isLiked;
    if(isLiked === true){
        likedQuoteCollection.unshift(quoteCollection[0]);
        const list = displayQuotes(likedQuoteCollection[0]);
        likedQuotes.prepend(list);
    }else{
        likedQuoteCollection.splice(likedQuoteCollection.indexOf(quoteCollection[0]));
        const childToRemove = likedQuotes.children[0];
        childToRemove.remove();
    }
    localStorage.setItem('likedQuotes', '');
    localStorage.setItem('likedQuotes', JSON.stringify(likedQuoteCollection));
    console.log('Liked Quotes', likedQuoteCollection);
})

bookmarkIcon.addEventListener('click', ()=>{
    bookmarkIcon.classList.toggle('solid');
})

// things that must be done when the page is loaded
document.addEventListener('DOMContentLoaded', ()=>{
    let storedQuotes = [];
    let storedLikedQuotes = [];
    storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    storedLikedQuotes = JSON.parse(localStorage.getItem('likedQuotes'));

    if(storedQuotes){
        for(let i=0;i<storedQuotes.length;i++){
            if(quoteList.children.length <= 4){
                quoteCollection.push(storedQuotes[i]);

                const list = displayQuotes(quoteCollection[i]);
                const childToRemove = quoteList.children[3];
                if(quoteList.children.length <= 3){
                    quoteList.prepend(list);
                }else{
                    childToRemove.remove();
                    quoteList.prepend(list);
                }
            }            
        }
        if(storedLikedQuotes){
            for(let i=0;i<storedLikedQuotes.length;i++){
                likedQuoteCollection.push(storedLikedQuotes[i]);
                const list = displayQuotes(likedQuoteCollection[i]);
                likedQuotes.prepend(list)
            };
        }
    }
})


const mainFunc = ()=>{

    function responder(responseData){
                if(Object.keys(responseData).length === 0){
                    alert("Oops! can't find a quote with specified parameter");
                }else{
                    quote.textContent = responseData[0].quote;
                    author.innerHTML = responseData[0].author;
                    categories.innerHTML += responseData[0].categories;
                }      
                bottomIcons.style.display = 'flex';
                quoteCollection.unshift([responseData[0].quote, responseData[0].author, crypto.randomUUID(), false]);
                if(quoteCollection.length>=4){
                    quoteCollection.splice(4)
                }
                localStorage.setItem('quotes', '');
                localStorage.setItem('quotes', JSON.stringify(quoteCollection));
                const list = displayQuotes(quoteCollection[0]);
                const childToRemove = quoteList.children[3];
                if(quoteList.children.length <= 3){
                    quoteList.prepend(list);
                }else{
                    childToRemove.remove();
                    quoteList.prepend(list);
                }
                console.log('Quote Collection:', quoteCollection);

                if(isLiked === true){
                    heartIcon.classList.toggle('solid');
                    isLiked = !isLiked;
                }

    }

    
            async function quoteData(){
                const YOUR_API_KEY = `A+qse2m8Q7aY66TvOpMbkg==d1lgmBApcvvuZIRr`;
                const url = `https://api.api-ninjas.com/v2/`
            if(selectCategory.value!='' && inputValue.value!=''){
                const response = await fetch(
                   `${url}quotes?categories=${selectCategory.value}&author=${inputValue.value}`, 
                   {
                       method: `GET`,
                       headers: {
                          'X-Api-Key': YOUR_API_KEY
                       }
                    }
                );      
                const responseData = await response.json();      
                console.log(responseData);
                responder(responseData);
            }else if(selectCategory.value!='' && inputValue.value===''){
                const response = await fetch(
                   `${url}quotes?categories=${selectCategory.value}`, 
                   {
                       method: `GET`,
                       headers: {
                          'X-Api-Key': YOUR_API_KEY
                       }
                    }
                );      
                const responseData = await response.json();      
                console.log(responseData);
                responder(responseData);
                
            }else if(selectCategory.value==='' && inputValue.value!=''){
                const response = await fetch(
                   `${url}quotes?author=${inputValue.value}`, 
                   {
                       method: `GET`,
                       headers: {
                          'X-Api-Key': YOUR_API_KEY
                       }
                    }
                );      
                const responseData = await response.json();      
                console.log(responseData);
                responder(responseData);
            }
            else {
            const response = await fetch(
                `${url}randomquotes`, 
                {
                    method: `GET`,
                    headers: {
                        'X-Api-Key': YOUR_API_KEY
                    }
                }
            );
            const responseData = await response.json();      
            console.log(responseData);
            responder(responseData);
            }

        }
        quoteData();
}


mainBtn.addEventListener('click', mainFunc);
selectCategory.addEventListener('click', ()=>{
    console.log(selectCategory.value);
})

