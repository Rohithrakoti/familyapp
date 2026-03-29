const API = "http://localhost:3000/events";

async function loadEvents() {
    const res = await fetch(API);
    const data = await res.json();

    const container = document.getElementById("events");
    container.innerHTML = "";

    data.forEach(event => {
        let imagesHTML = "";

        if (event.images && event.images.length > 0) {
            imagesHTML = event.images.map(img => 
                `<img src="${img}" width="100" />`
            ).join("");
        }

        container.innerHTML += `
            <div class="card">
                <h3>${event.name}</h3>
                <p>Date: ${event.date}</p>
                <a href="${event.whatsapp}" target="_blank">Join WhatsApp</a>
                <div>${imagesHTML}</div>
            </div>
        `;
    });
}

async function createEvent() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const whatsapp = document.getElementById("whatsapp").value;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, whatsapp })
    });

    loadEvents();
}

async function uploadImages() {
    const files = document.getElementById("images").files;
    const eventId = document.getElementById("eventIdUpload").value;

    const formData = new FormData();

    for (let file of files) {
        formData.append("images", file);
    }

    await fetch(`http://localhost:3000/upload/${eventId}`, {
        method: "POST",
        body: formData
    });

    alert("Images uploaded!");
    loadEvents();
}

loadEvents();