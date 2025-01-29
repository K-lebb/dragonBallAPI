const divResult = document.getElementById("result");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const paginationContainer = document.createElement("div");
paginationContainer.className = "pagination";

const prevButton = document.createElement("button");
prevButton.innerText = "Anterior";
prevButton.disabled = true; 

const nextButton = document.createElement("button");
nextButton.innerText = "Próximo";

paginationContainer.appendChild(prevButton);
paginationContainer.appendChild(nextButton);
document.body.appendChild(paginationContainer);

let currentPage = 1;
const itemsPerPage = 10; 

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    currentPage = 1;
    fetchCharacters(query);
});

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(searchInput.value.trim().toLowerCase());
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(searchInput.value.trim().toLowerCase());
});

async function fetchCharacters(query = '') {
    divResult.innerHTML = ''; 
    let hasResults = false;

    let startID = (currentPage - 1) * itemsPerPage + 1;
    let endID = startID + itemsPerPage - 1;

    for (let charactersID = startID; charactersID <= endID; charactersID++) {
        const url = `https://dragonball-api.com/api/characters/${charactersID}`;

        try {
            const response = await fetch(url);
            if (!response.ok) continue;

            const data = await response.json();

            if (query === '' || data.name.toLowerCase().includes(query)) {
                hasResults = true;

                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.image}" alt="${data.name}" style="width: 150px; height: auto; border-radius: 8px;"/>
                    <p><strong>Ki:</strong> ${data.ki}</p>
                    <p><strong>MaxKi:</strong> ${data.maxKi}</p>
                    <p><strong>Race:</strong> ${data.race}</p>
                    <p><strong>Gender:</strong> ${data.gender}</p>
                    <p><strong>Affiliation:</strong> ${data.affiliation}</p>
                `;
                divResult.appendChild(card);
            }
        } catch (error) {
            console.error(`Erro ao buscar personagem ${charactersID}:`, error);
        }
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = !hasResults; 

    if (!hasResults && query) {
        divResult.innerHTML = `<p>Nenhum personagem encontrado para "<strong>${query}</strong>".</p>`;
    }
}

fetchCharacters();
