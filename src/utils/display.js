import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { service } from './service';

export const display = (() => {
    const savedQuotesBox = document.querySelector('.saved-quotes-box');
    const overlay = document.querySelector('.overlay');
    const likedQuotesBox = document.querySelector('.liked-quotes-box');
    const likedQuotesList = document.querySelector('.liked-quotes-list');
    const quoteLibraryList = document.querySelector('.quote-library-list');
    const likedQuotes = document.querySelector('.liked-quotes');
    const heartIcon = document.querySelector('.heart-icon');
    const bookmarkIcon = document.querySelector('.bookmark-icon');
    const bottomIcons = document.querySelector('.bottom-icons');
    const savedContentList = document.querySelector('.saved-content-list');

    return {
        popBottomIcon: function() {
            bottomIcons.style.display = 'flex';
        },
        popUpMode_list: function () {
            quoteLibraryList.style.display = 'flex';
            overlay.style.display = 'block';
        },
        normalMode_list: function () {
            quoteLibraryList.style.display = 'none';
            overlay.style.display = 'none';
        },
        popUpMode_bookmark: function () {
            savedQuotesBox.style.display = 'block';
            overlay.style.display = 'block';
        },
        normalMode_bookmark: function () {
            savedQuotesBox.style.display = 'none';
            overlay.style.display = 'none';
        },
        popUpMode_liked: function () {
            likedQuotesBox.style.display = 'flex';
            overlay.style.display = 'block';
        },
        normalMode_liked: function () {
            likedQuotesBox.style.display = 'none';
            overlay.style.display = 'none';
        },
        displayQuotes: function (array) {
            let list = document.createElement('li');
            list.classList.add('previous-quotes-list');

            let previousQuote = document.createElement('div');
            let quoteAuthor = document.createElement('div');
            previousQuote.classList.add('previous-quote');
            quoteAuthor.classList.add('quote-author');

            if (array) {
                previousQuote.textContent = array[0];
                quoteAuthor.textContent = array[1];
            }

            list.append(previousQuote, quoteAuthor);
            return list;
        },
        displayLibraryList: function (obj) {
            const list = document.createElement('li');
            list.classList.add('previous-quotes-list');
            list.classList.add('saved-quotes-li')
            list.textContent = obj.title;
            list.setAttribute('data-element-id', obj.id);
            console.log(list, obj);
            return list;
        },
        displaySavedQuotes: function (array) {
            let group = document.createElement('div');
            group.classList.add('quotes-grouplist')
            let groupHeader = document.createElement('header');
            let content = document.createElement('ul');
            groupHeader.textContent = array.title;

            for (let i = 0; i < array.quotes.length; i++) {
                let list = document.createElement('li');
                let quote = document.createElement('div');
                let author = document.createElement('div');

                list.classList.add('previous-quotes-list');
                quote.textContent = array.quotes[i][0];
                author.textContent = array.quotes[i][1];
                quote.classList.add('previous-quote');
                author.classList.add('quote-author');

                list.append(quote, author)
                content.appendChild(list);
            }
            group.append(groupHeader, content);
            return group;
        },
        displayLikedQuotes: function (array) {
            display.popUpMode_liked();
            likedQuotesList.innerHTML = '';
            console.log('More Liked QUotes', array, likedQuotesList);

            for (let i = 0; i < array.length; i++) {
                const list = display.displayQuotes(array[i]);
                likedQuotesList.prepend(list);
            }
        },
        addLikedQuotes: function (element, secondElement, num) {
            const childToRemove = secondElement.children[num];
            if (secondElement.children.length <= num) {
                secondElement.prepend(element);
            } else {
                childToRemove.remove();
                secondElement.prepend(element);
            }
        },
        addLibraryList: function (list) {
            quoteLibraryList.append(list);
        },
        removeLikedQuote: function () {
            const childToRemove = likedQuotes.children[0];
            childToRemove.remove();
        },
        toggleBookmark: function () {
            bookmarkIcon.classList.toggle('solid');
        },
        toggleLiked: function () {
            heartIcon.classList.toggle('solid');
        },
        addLibraryList: function (list, array) {
            list.append(display.displayLibraryList(array[i]))
        },
        displayToast: function () {
            Toastify({
                text: 'Saved Successfully!',
                duration: 3000,
                position: 'center',
                style: {
                    background: 'var(--secondary-color)',
                }
            }).showToast();
        },
        displayLibraryList: function () {
            savedContentList.innerHTML = '';
            for (let i = 0; i < service.savedLibraries.length; i++) {
                display.addLibraryList(savedContentList, service.savedLibraries[i]);
            }
        }
    }
})()