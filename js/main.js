let currentIndex = 0;
const drinkList = [];

document.querySelector('button').addEventListener('click', getdrink);

function getdrink() {
    let drink = document.querySelector('input').value;

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + (drink.trim(' '));

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                drinkList.length = 0; // Clear previous drink list
                data.drinks.forEach(drink => {
                    drinkList.push({
                        name: drink.strDrink,
                        image: drink.strDrinkThumb,
                        instructions: drink.strInstructions,
                    });
                });

                displayDrink(currentIndex);
                startCarousel();
            } else {
                console.log('Drink not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayDrink(index) {
    const drink = drinkList[index];
    if (drink) {
        document.querySelector('h2').innerText = drink.name;
        document.querySelector('img').src = drink.image;
        document.querySelector('h3').innerText = drink.instructions;
    }
}

function startCarousel() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % drinkList.length;
        displayDrink(currentIndex);
    }, 30000); // Change drink every 5 seconds
}
