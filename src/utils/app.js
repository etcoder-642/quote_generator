export const mainFunc = (()=>{

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
                const list = display.displayQuotes(quoteCollection[0]);
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
})()
