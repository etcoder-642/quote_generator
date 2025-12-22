import { logic } from "./app";

const responder = function (responseData) {
    return {
        response: () => {
            if (Object.keys(responseData).length === 0) {
                alert("Oops! can't find a quote with specified parameter");
            } else {
                quote.textContent = responseData[0].quote;
                author.innerHTML = responseData[0].author;
                categories.innerHTML += responseData[0].categories;
            }
            bottomIcons.style.display = 'flex';
            quoteCollection.unshift([responseData[0].quote, responseData[0].author, crypto.randomUUID(), false]);
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

            if (isLiked === true) {
                heartIcon.classList.toggle('solid');
                isLiked = !isLiked;
            }
            if (isSaved === true) {
                bookmarkIcon.classList.toggle('solid');
                isSaved = !isSaved;
            }
        }
    }
}
