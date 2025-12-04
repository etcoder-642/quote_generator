import "./styles/main.css"


const mainBtn = document.querySelector('.main-btn');
const quoteSection = document.querySelector('.main-section');


const mainFunc = ()=>{
            async function quoteData(){
                const YOUR_API_KEY = `A+qse2m8Q7aY66TvOpMbkg==d1lgmBApcvvuZIRr`;
                const url = `https://api.api-ninjas.com/v2/quotes`
            const response = await fetch(
                url, 
                {
                    method: `GET`,
                    headers: {
                        'X-Api-Key': YOUR_API_KEY
                    }
                }
            );      
            const responseData = await response.json();      
            console.log(responseData);

            quoteSection.textContent = responseData[0].quote;

        }
        quoteData();

}

mainBtn.addEventListener('click', mainFunc);

