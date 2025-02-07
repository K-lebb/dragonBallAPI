const divResult = document.getElementById("result");
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

let allCharacters = [];

async function loadAllCharacters() {
    allCharacters = [];
    for (let charactersID = 1; charactersID <= 58; charactersID++) {
        const url = `https://dragonball-api.com/api/characters/${charactersID}`;
        try {
            const response = await fetch(url);
            if (!response.ok) continue;

            const data = await response.json();
            allCharacters.push(data);
        } catch (error) {
            console.error(`Erro ao buscar personagem ${charactersID}:`, error);
        }
    }
}

function filterAndDisplayCharacters(query = '') {
    divResult.innerHTML = '';

    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().startsWith(query.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const charactersToDisplay = filteredCharacters.slice(startIndex, endIndex);

    if (charactersToDisplay.length > 0) {
        charactersToDisplay.forEach(character => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}" style="width: 150px; height: auto; border-radius: 8px;"/>
                <p><strong>Ki:</strong> ${character.ki}</p>
                <p><strong>MaxKi:</strong> ${character.maxKi}</p>
                <p><strong>Race:</strong> ${character.race}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Affiliation:</strong> ${character.affiliation}</p>
            `;
            divResult.appendChild(card);
        });
    } else {
        divResult.innerHTML = `<p>Nenhum personagem encontrado para "<strong>${query}</strong>".</p>`;
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= filteredCharacters.length;
}

searchInput.addEventListener('input', () => {
    currentPage = 1; 
    filterAndDisplayCharacters(searchInput.value.trim());
});

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        filterAndDisplayCharacters(searchInput.value.trim());
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    filterAndDisplayCharacters(searchInput.value.trim());
});

loadAllCharacters().then(() => {
    filterAndDisplayCharacters(); 
});