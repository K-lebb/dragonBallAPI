const divResult = document.getElementById("result");

async function fetchCharacters() {
    
    for(let charactersID = 1; charactersID < 5; charactersID++){

        console.log("passou", charactersID);

        const url = `https://dragonball-api.com/api/characters/${charactersID}`;

        try {
            const response = await fetch(url);

            if(!response.ok){
                console.warn(`Personagem ${charactersID} não encontrado (Erro ${response.status}).`);
            }

            const data = await response.json();

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML =`
            <h2>${data.name}</h2>
            <img src="${data.image}" alt="${data.name}" style="width: 150px; height: auto; border-radius: 8px;"/>
            <p><strong>Ki:</strong> ${data.ki}</p>
            <p><strong>MaxKi:</strong> ${data.maxKi}</p>
            <p><strong>Race:</strong> ${data.race}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Affiliation:</strong> ${data.affiliation}</p>
            `
            divResult.appendChild(card);
        } catch (error) {
        }
    }
    
}

fetchCharacters();