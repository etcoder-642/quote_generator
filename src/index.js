import "./styles/main.css";

import { display } from "./utils/display";
import { logic } from "./utils/app";
import { service } from "./utils/service";

// things that must be done when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    service.initialize();
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
})

// Things that happen when a quote is liked

document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('.theme-toggle-btn');
    if (themeBtn) {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        return;
    }

    if (e.target.classList.contains('heart-icon')) {
        display.toggleLiked();
        service.invertLikeBool();

        if (service.isLiked === true) {
            service.addElement_liked();
            service.addLikedQuote();
        } else {
            service.removeElement_liked();
            display.removeLikedQuote();
        }
        service.saveLocal_liked();
    } else if (e.target.classList.contains('bookmark-icon')) {
        if (service.isSaved === false) {
            service.invertSavedBool();
            display.toggleBookmark();
            display.popUpMode_bookmark();
            display.displayContentList();
        }
    } else if (e.target.classList.contains('saved-library-btn')) {
        service.createLibrary(e);
    } else if (e.target.classList.contains('close-saved-box')) {
        display.normalMode_bookmark();
        display.toggleBookmark();
        service.invertSavedBool();
    } else if (e.target.classList.contains('saved-quotes-li')) {
        service.assignLibraryElement(e);
        service.saveLocal_library();

        display.normalMode_bookmark();
        display.displayToast();
        e.stopPropagation();
    } else if (e.target.classList.contains('more-saved-quotes')) {
        display.popUpMode_list();
        display.renderFullLibraryList(service.savedLibraries);
    } else if (e.target.classList.contains('close-library-box')) {
        display.normalMode_list();
    } else if (e.target.classList.contains('expand-likes')) {
        display.displayLikedQuotes(service.likedQuoteCollection);
    } else if (e.target.classList.contains('close-liked-box')) {
        display.normalMode_liked();
    } else if (e.target.classList.contains('main-btn')) {
        logic.response().then(responseData => {
            service.responder(responseData);
        })
    }
})

