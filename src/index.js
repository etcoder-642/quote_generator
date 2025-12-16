import "./styles/main.css";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css" // Don't forget the CSS!

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
const expandLikes = document.querySelector('.expand-likes');
const likedQuotesBox = document.querySelector('.liked-quotes-box');
const likedQuotesList = document.querySelector('.liked-quotes-list');
const savedQuotesBox = document.querySelector('.saved-quotes-box');
const savedLibraryBtn = document.querySelector('.saved-library-btn');
const savedContentList = document.querySelector('.saved-content-list');
const overlay = document.querySelector('.overlay');
const moreQuotes = document.querySelector('.more-saved-quotes');
const quoteLibraryList = document.querySelector('.quote-library-list');

let libraryTitles = document.querySelector('.library-title');
let libraryDesc = document.querySelector('.library-desc');

let isLiked = false;
let isSaved = false;
let isSavedDisplayed = false;
const quoteCollection = [];
const likedQuoteCollection = [];
const savedLibraries = [];


// To display quotes, it takes an array of quotes and returns a list element which contains the quote and author
const displayQuotes = (array)=>{
    let list = document.createElement('li');
    list.classList.add('previous-quotes-list');

    let previousQuote = document.createElement('div');
    let quoteAuthor = document.createElement('div');
    previousQuote.classList.add('previous-quote');
    quoteAuthor.classList.add('quote-author');

    if(array){
        previousQuote.textContent = array[0];
        quoteAuthor.textContent = array[1];
    }

    list.append(previousQuote, quoteAuthor);
    return list;
}

// Things that happen when a quote is liked

heartIcon.addEventListener('click', ()=>{
    heartIcon.classList.toggle('solid');
    isLiked = !isLiked;
    if(isLiked === true){
        likedQuoteCollection.unshift(quoteCollection[0]);
        const list = displayQuotes(likedQuoteCollection[0]);
        const childToRemove = likedQuotes.children[2];
        if(likedQuotes.children.length <= 2){
            likedQuotes.prepend(list);
        }else{
            childToRemove.remove();
            likedQuotes.prepend(list);
        }
    }else{
        likedQuoteCollection.splice(likedQuoteCollection.indexOf(quoteCollection[0]),1);
        console.log(likedQuoteCollection)
        const childToRemove = likedQuotes.children[0];
        childToRemove.remove();
    }
    localStorage.setItem('likedQuotes', '');
    localStorage.setItem('likedQuotes', JSON.stringify(likedQuoteCollection));
    console.log('Liked Quotes', likedQuoteCollection);
})

const displaySaved = (obj)=>{
    const list = document.createElement('li');
    list.classList.add('previous-quotes-list');
    list.classList.add('saved-quotes-li')
    list.textContent = obj.title;
    list.setAttribute('data-element-id', obj.id);
    console.log(list, obj);
    return list;
}

// Things that happen 

bookmarkIcon.addEventListener('click', ()=>{
    bookmarkIcon.classList.toggle('solid');
    isSaved = !isSaved;

    if(isSaved === true){
        console.log(savedLibraries)
        savedQuotesBox.style.display = 'block';
        overlay.style.display = 'block';
        savedContentList.innerHTML = ''
        for(let i=0;i<savedLibraries.length;i++){
            savedContentList.append(displaySaved(savedLibraries[i]))
        }
        console.log(savedContentList);
    }
});


savedLibraryBtn.addEventListener('click', (e)=>{
    if(libraryDesc.checkValidity() && libraryTitles.checkValidity()){
        e.preventDefault();
        savedLibraries.push({
            'id': crypto.randomUUID(),
            'title': libraryTitles.value,
            'description': libraryDesc.value,
            'quotes': []
        })
    }
    console.log(savedLibraries);
    localStorage.setItem('savedItems', '');
    localStorage.setItem('savedItems', JSON.stringify(savedLibraries));
})


document.querySelector('.close-saved-box').addEventListener('click', ()=>{
    savedQuotesBox.style.display = 'none';
    overlay.style.display = 'none';

    if(isSaved){
        bookmarkIcon.classList.toggle('solid');
        isSaved = !isSaved;
    }
    
})


savedQuotesBox.addEventListener('click', (e)=>{
    if(e.target.classList.contains('saved-quotes-li')){
    for(let i=0;i<savedLibraries.length;i++){
        if(savedLibraries[i].id === e.target.dataset.elementId){
            savedLibraries[i].quotes.push(quoteCollection[0]);
        }
    }
    localStorage.setItem('savedItems', '');
    localStorage.setItem('savedItems', JSON.stringify(savedLibraries));

    Toastify({text: 'Saved Successfully!', 
        duration: 3000,
        position: 'center',
        style: {
            background: 'var(--secondary-color)',
        }
    }).showToast();
    savedQuotesBox.style.display = 'none';
    overlay.style.display = 'none';
    console.log(savedLibraries)
    }
})


const displaySavedQuotes = (array)=>{
    let group = document.createElement('div');
    group.classList.add('quotes-grouplist')
    let groupHeader = document.createElement('header');
    let content = document.createElement('ul');
    groupHeader.textContent = array.title;
    for(let i=0; i<array.quotes.length;i++){
        let list = document.createElement('li');
        list.classList.add('previous-quotes-list');
        list.textContent = array.quotes[i][0];
        content.appendChild(list);
    }
    group.append(groupHeader, content);
    return group;
}

moreQuotes.addEventListener('click', ()=>{
    quoteLibraryList.style.display = 'flex';

    if(isSavedDisplayed === false){
       for(let i=0; i<savedLibraries.length;i++){
           const groupList = displaySavedQuotes(savedLibraries[i]);
           console.log(groupList);
           quoteLibraryList.append(groupList);
        }
    }
    isSavedDisplayed = true;
    overlay.style.display = 'block';
})

document.querySelector('.close-library-box').addEventListener('click', ()=>{
    quoteLibraryList.style.display = 'none';
    overlay.style.display = 'none';
    
})


// things that must be done when the page is loaded
document.addEventListener('DOMContentLoaded', ()=>{
    let storedQuotes = [];
    let storedLikedQuotes = [];
    let storedSavedQuotes = [];
    storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    storedLikedQuotes = JSON.parse(localStorage.getItem('likedQuotes'));
    storedSavedQuotes = JSON.parse(localStorage.getItem('savedItems'));

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
    }
    if(storedLikedQuotes){
        for(let i=0;i<storedLikedQuotes.length;i++){
            likedQuoteCollection.push(storedLikedQuotes[i]);
            const list = displayQuotes(likedQuoteCollection[i]);
            const childToRemove = likedQuotes.children[2];
            if(likedQuotes.children.length <= 2){
                likedQuotes.prepend(list);
            }else{
                childToRemove.remove();
                likedQuotes.prepend(list);
            }
        };
    }
    if(storedSavedQuotes){
        for(let i=0;i<storedSavedQuotes.length;i++){
            savedLibraries.push(storedSavedQuotes[i]);
        }
    }
})

// Things that happen when the main 'Generate Quote' is clicked
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
                if(isSaved === true){
                    bookmarkIcon.classList.toggle('solid');
                    isSaved = !isSaved;
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

// things that happen when the 'More' button under Liked Quotes is Clicked
const displayLikedQuotes = ()=>{
    likedQuotesBox.style.display = 'flex';
    overlay.style.display = 'block';
    likedQuotesList.innerHTML = ''
    console.log('More Liked QUotes', likedQuoteCollection, likedQuotesList)
    for(let i=0; i < likedQuoteCollection.length; i++){
        const list = displayQuotes(likedQuoteCollection[i]);
        likedQuotesList.prepend(list);
    }
}
document.querySelector('.close-liked-box').addEventListener('click', ()=>{
    likedQuotesBox.style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
})
expandLikes.addEventListener('click', displayLikedQuotes)


mainBtn.addEventListener('click', mainFunc);
selectCategory.addEventListener('click', ()=>{
    console.log(selectCategory.value);
})

