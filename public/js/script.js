document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    loadGallery();
});

/* ================= EVENTS ================= */

function addEvent() {
    const name = document.getElementById('event-name').value.trim();
    const fromDate = document.getElementById('event-from-date').value;
    const toDate = document.getElementById('event-to-date').value;
    const imageUrl = document.getElementById('event-image').value.trim();
    const details = document.getElementById('event-details').value.trim();

    if (!name || !fromDate || !toDate) {
        alert('Please enter event name, from date, and to date.');
        return;
    }

    const events = JSON.parse(localStorage.getItem('familyEvents')) || [];
    events.push({ name, fromDate, toDate, imageUrl, details });
    localStorage.setItem('familyEvents', JSON.stringify(events));

    document.getElementById('event-name').value = '';
    document.getElementById('event-from-date').value = '';
    document.getElementById('event-to-date').value = '';
    document.getElementById('event-image').value = '';
    document.getElementById('event-details').value = '';

    loadEvents();
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('familyEvents')) || [];
    const eventList = document.getElementById('event-list');
    if (!eventList) return;

    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const li = document.createElement('li');

        const text = `${event.name} – ${new Date(event.fromDate).toLocaleDateString()} to ${new Date(event.toDate).toLocaleDateString()}`;

        li.innerHTML = `
            <span class="event-link">${text}</span>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;

        li.querySelector('.event-link')
          .addEventListener('click', () => openModal(event));

        eventList.appendChild(li);
    });
}

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('familyEvents')) || [];
    events.splice(index, 1);
    localStorage.setItem('familyEvents', JSON.stringify(events));
    loadEvents();
}

function openModal(event) {
    document.getElementById('modal-title').textContent = event.name;
    document.getElementById('modal-dates').textContent =
        `From ${new Date(event.fromDate).toLocaleDateString()} to ${new Date(event.toDate).toLocaleDateString()}`;

    document.getElementById('modal-image').src =
        event.imageUrl || 'images/default-event.jpg';

    document.getElementById('modal-details').textContent =
        event.details || 'No details provided.';

    document.getElementById('event-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
}

window.onclick = function(e) {
    if (e.target === document.getElementById('event-modal')) {
        closeModal();
    }

    if (e.target === document.getElementById('image-modal')) {
        closeImage();
    }
};

/* ================= GALLERY ================= */

function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    container.innerHTML = '';

    console.log("Gallery Data:", window.galleryImages); // 👈 DEBUG

    if (!window.galleryImages) return;

    window.galleryImages.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = item.src;

        const title = document.createElement('p');
        title.innerText = item.name;
        title.style.textAlign = "center";
        title.style.fontWeight = "bold";

        img.onclick = () => {
            document.getElementById("image-modal").style.display = "block";
            document.getElementById("modal-img").src = item.src;
        };

        card.appendChild(img);
        card.appendChild(title);
        container.appendChild(card);
    });
}

/* ================= IMAGE MODAL ================= */

function closeImage() {
    document.getElementById("image-modal").style.display = "none";
}