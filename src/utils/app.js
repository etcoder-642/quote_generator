import { display } from "./display";
import { responder } from "./service";

export const logic = (() => {
    const YOUR_API_KEY = `A+qse2m8Q7aY66TvOpMbkg==d1lgmBApcvvuZIRr`;
    const url = `https://api.api-ninjas.com/v2/`;

    const inputValue = document.querySelector('.input-value');
    const selectCategory = document.querySelector('.select-category');

    return {

        response: async function quoteData() {
            if (selectCategory.value != '' && inputValue.value != '') {
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
                return responseData;
            } else if (selectCategory.value != '' && inputValue.value === '') {
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
                return responseData;

            } else if (selectCategory.value === '' && inputValue.value != '') {
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
                return responseData;
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
                return responseData;
            }
        }
    }
})()
