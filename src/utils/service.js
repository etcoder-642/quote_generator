import { display } from "./display";

export const service = (() => {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');

    const categories = document.querySelector('.categories');
    const quoteList = document.querySelector('.quote-list');
    const likedQuotes = document.querySelector('.liked-quotes');

    let libraryTitles = document.querySelector('.library-title');
    let libraryDesc = document.querySelector('.library-desc');

    return {
        isLiked: false,
        isSaved: false,
        isSavedDisplayed: false,
        likedQuoteCollection: [],
        quoteCollection: [],
        savedLibraries: [],
        invertLikeBool: function() {
            service.isLiked = !service.isLiked;
        },
        invertSavedBool: function() {
            service.isSaved = !service.isSaved;
        },
        invertSavedDisplayed: function() {
            service.isSavedDisplayed = true;
        },
        addElement_liked: function() {
            service.likedQuoteCollection.unshift(service.quoteCollection[0]);
        },
        removeElement_liked: function() {
            service.likedQuoteCollection.splice(service.likedQuoteCollection.indexOf(service.quoteCollection[0]),1);
        },
        saveLocal_liked: function () {
            localStorage.setItem('likedQuotes', '');
            localStorage.setItem('likedQuotes', JSON.stringify(service.likedQuoteCollection));
        },
        saveLocal_library: function () {
            localStorage.setItem('savedItems', '');
            localStorage.setItem('savedItems', JSON.stringify(service.savedLibraries));
        },
        createLibrary: function (element) {
            if (libraryDesc.checkValidity() && libraryTitles.checkValidity()) {
                element.preventDefault();
                service.savedLibraries.push({
                    'id': crypto.randomUUID(),
                    'title': libraryTitles.value,
                    'description': libraryDesc.value,
                    'quotes': []
                })
            }
        },
        assignLibraryElement: function (element) {
            for (let i = 0; i < service.savedLibraries.length; i++) {
                if (service.savedLibraries[i].id === element.target.dataset.elementId) {
                    service.savedLibraries[i].quotes.push(service.quoteCollection[0]);
                }
            };
        },
        initialize: function () {
            let storedQuotes = [];
            let storedLikedQuotes = [];
            let storedSavedQuotes = [];
            storedQuotes = JSON.parse(localStorage.getItem('quotes'));
            storedLikedQuotes = JSON.parse(localStorage.getItem('likedQuotes'));
            storedSavedQuotes = JSON.parse(localStorage.getItem('savedItems'));

            if (storedQuotes) {
                for (let i = 0; i < storedQuotes.length; i++) {
                    if (quoteList.children.length <= 4) {
                        service.quoteCollection.push(storedQuotes[i]);
                        const list = display.displayQuotes(service.quoteCollection[i]);
                        display.addLikedQuotes(list, quoteList, 3);
                    }
                }
            }
            if (storedLikedQuotes) {
                for (let i = 0; i < storedLikedQuotes.length; i++) {
                    service.likedQuoteCollection.push(storedLikedQuotes[i]);
                    const list = display.displayQuotes(service.likedQuoteCollection[i]);
                    display.addLikedQuotes(list, likedQuotes, 2);
                };
            }
            if (storedSavedQuotes) {
                for (let i = 0; i < storedSavedQuotes.length; i++) {
                    service.savedLibraries.push(storedSavedQuotes[i]);
                }
            }
            return {
                storedLikedQuotes,
                storedQuotes,
                storedSavedQuotes
            }
        },
        responder: (data) => {
            if (Object.keys(data).length === 0) {
                alert("Oops! can't find a quote with specified parameter");
            } else {
                quote.textContent = data[0].quote;
                author.innerHTML = data[0].author;
                categories.innerHTML += data[0].categories;
            }
            bottomIcons.style.display = 'flex';
            service.quoteCollection.unshift([data[0].quote, data[0].author, crypto.randomUUID(), false]);
            if (quoteCollection.length >= 4) {
                quoteCollection.splice(4)
            }
            localStorage.setItem('quotes', '');
            localStorage.setItem('quotes', JSON.stringify(quoteCollection));
            const list = display.displayQuotes(quoteCollection[0]);
            const childToRemove = quoteList.children[3];
            if (quoteList.children.length <= 3) {
                quoteList.prepend(list);
            } else {
                childToRemove.remove();
                quoteList.prepend(list);
            }
            console.log('Quote Collection:', quoteCollection);

            if (service.isLiked === true) {
                heartIcon.classList.toggle('solid');
                service.isLiked = !service.isLiked;
            }
            if (service.isSaved === true) {
                bookmarkIcon.classList.toggle('solid');
                service.isSaved = !service.isSaved;
            }
        }
    }
})()
