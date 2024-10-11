import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"

const fetchData = async (query) => {
const url = `https://cats-by-api-ninjas.p.rapidapi.com/v1/cats?name=${query}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
		'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_URL
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
	handleData(result);
} catch (error) {
	console.error(error);
}};

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = document.getElementById('searchInput').value;
            fetchData(query);
        });
    }
});

const handleData = (data) => {
    const resultsContainer = document.querySelector('.dynamic_data');
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    resultsContainer.innerHTML = '';

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found. Try another keyword.</p>';
        return;
    }

    data.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.classList.add('col');
        
        const {
            name, length, origin, image_link, family_friendly, shedding, general_health, playfulness,
            meowing, children_friendly, stranger_friendly, grooming, intelligence, other_pets_friendly,
            min_weight, max_weight, min_life_expectancy, max_life_expectancy
        } = cat;

        catCard.innerHTML = `
            <div class="card h-100">
                <img src="${image_link}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h5 style="font-size: 20px;" class="card-title">${name}</h5>
                    <p class="card-text"><strong>Origin:</strong> ${origin || 'Unknown'}</p>
                    <p class="card-text"><strong>Length:</strong> ${length}</p>
                    <p class="card-text"><strong>Weight:</strong> ${min_weight} - ${max_weight} lbs</p>
                    <p class="card-text"><strong>Life Expectancy:</strong> ${min_life_expectancy} - ${max_life_expectancy} years</p>
                    
                    <h6 style="font-size: 20px;">Traits 🐈‍⬛:</h6>
                    <p class="card-text"><strong>Family Friendly:</strong> ${family_friendly}/5</p>
                    <p class="card-text"><strong>Children Friendly:</strong> ${children_friendly}/5</p>
                    <p class="card-text"><strong>Stranger Friendly:</strong> ${stranger_friendly}/5</p>
                    <p class="card-text"><strong>Other Pets Friendly:</strong> ${other_pets_friendly}/5</p>
                    <p class="card-text"><strong>Playfulness:</strong> ${playfulness}/5</p>
                    <p class="card-text"><strong>Meowing:</strong> ${meowing}/5</p>
                    <p class="card-text"><strong>Grooming:</strong> ${grooming}/5</p>
                    <p class="card-text"><strong>Shedding:</strong> ${shedding}/5</p>
                    <p class="card-text"><strong>General Health:</strong> ${general_health}/5</p>
                    <p class="card-text"><strong>Intelligence:</strong> ${intelligence}/5</p>
                </div>
            </div>
        `;

        resultsContainer.appendChild(catCard);
    });
};