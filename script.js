// Navigation sticky au scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }
});

// Animation de défilement doux pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Fonction pour initialiser la carte Google Maps
function initMap() {
    // Coordonnées des villes japonaises principales
    const locations = [
        { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
        { name: "Kyoto", lat: 35.0116, lng: 135.7681 },
        { name: "Osaka", lat: 34.6937, lng: 135.5023 },
        { name: "Hiroshima", lat: 34.3853, lng: 132.4553 },
        { name: "Nara", lat: 34.6851, lng: 135.8048 },
        { name: "Kanazawa", lat: 36.5612, lng: 136.6562 },
        { name: "Takayama", lat: 36.1408, lng: 137.2521 },
        { name: "Miyajima", lat: 34.2971, lng: 132.3226 },
        { name: "Hakone", lat: 35.2323, lng: 139.1071 },
        { name: "Nikko", lat: 36.7198, lng: 139.6982 }
    ];

    // Centrer la carte sur le Japon
    const japanCenter = { lat: 36.2048, lng: 138.2529 };
    
    // Créer une fonction simulée pour Google Maps en attendant l'API réelle
    console.log("Google Maps serait initialisée ici avec les lieux suivants :");
    locations.forEach(location => {
        console.log(`${location.name}: ${location.lat}, ${location.lng}`);
    });
    
    // Remplacer le message de chargement par un message temporaire
    document.getElementById('map').innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h3>Carte des destinations au Japon</h3>
            <p>Cette carte afficherait les destinations suivantes :</p>
            <ul style="list-style: none; margin-top: 20px;">
                ${locations.map(loc => `<li><strong>${loc.name}</strong></li>`).join('')}
            </ul>
            <p style="margin-top: 20px; color: #e74c3c;">Note: Pour activer la carte Google Maps réelle, une clé API Google Maps est nécessaire.</p>
        </div>
    `;
}

// Simuler le chargement de la carte
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initMap, 1000);
    
    // Animation pour faire apparaître les cartes d'itinéraires
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Fonction pour récupérer les données d'itinéraires détaillés
async function fetchItineraryDetails(itineraryId) {
    // Simuler une requête API pour récupérer les détails d'un itinéraire
    console.log(`Récupération des détails pour l'itinéraire ${itineraryId}`);
    
    // En production, ceci serait une vraie requête API
    const itineraries = {
        "itineraire1": {
            title: "Circuit Classique",
            days: [
                { day: 1, title: "Vol Bordeaux - Tokyo", description: "Départ de Bordeaux, arrivée à Tokyo le lendemain." },
                { day: 2, title: "Arrivée à Tokyo", description: "Installation à l'hôtel et premiers pas dans la ville." },
                { day: 3, title: "Tokyo - Quartier Asakusa", description: "Visite du temple Senso-ji et promenade sur la Nakamise-dori." },
                { day: 4, title: "Tokyo - Shibuya et Harajuku", description: "Découverte des quartiers jeunes et branchés de Tokyo." },
                { day: 5, title: "Tokyo - Shinjuku", description: "Visite des gratte-ciels et du jardin national Shinjuku Gyoen." },
                { day: 6, title: "Transfert vers Kyoto", description: "Voyage en Shinkansen et première découverte de Kyoto." },
                { day: 7, title: "Kyoto - Quartier de Gion", description: "Découverte du quartier des geishas et du temple Kiyomizu-dera." },
                { day: 8, title: "Kyoto - Fushimi Inari", description: "Randonnée dans les milliers de torii rouges." },
                { day: 9, title: "Kyoto - Temple Kinkaku-ji", description: "Visite du Pavillon d'Or et des jardins zen." },
                { day: 10, title: "Excursion à Nara", description: "Visite du parc aux daims et du Todai-ji." },
                { day: 11, title: "Transfert vers Osaka", description: "Découverte du château d'Osaka et du quartier de Dotonbori." },
                { day: 12, title: "Osaka - Quartiers modernes", description: "Shopping et gastronomie à Osaka." },
                { day: 13, title: "Transfert vers Hiroshima", description: "Voyage en Shinkansen vers Hiroshima." },
                { day: 14, title: "Hiroshima - Mémorial de la Paix", description: "Visite du Parc du Mémorial de la Paix." },
                { day: 15, title: "Excursion à Miyajima", description: "Visite de l'île sacrée et du torii flottant." },
                { day: 16, title: "Transfert vers Hakone", description: "Voyage vers la région du Mont Fuji." },
                { day: 17, title: "Hakone - Mont Fuji", description: "Croisière sur le lac Ashi et vue sur le Mont Fuji." },
                { day: 18, title: "Retour à Tokyo", description: "Dernières visites et shopping à Tokyo." },
                { day: 19, title: "Journée libre à Tokyo", description: "Temps libre pour les derniers achats ou visites." },
                { day: 20, title: "Départ de Tokyo", description: "Vol retour vers Bordeaux." },
                { day: 21, title: "Arrivée à Bordeaux", description: "Fin du voyage." }
            ]
        },
        // D'autres itinéraires seraient ajoutés ici
    };
    
    // Simuler un délai de requête
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(itineraries[itineraryId] || null);
        }, 500);
    });
}

// Gestionnaire de clic sur les boutons "Voir le détail"
document.querySelectorAll('.btn-secondary').forEach((btn, index) => {
    btn.addEventListener('click', async function(e) {
        e.preventDefault();
        const itineraryId = `itineraire${index + 1}`;
        
        // Dans un vrai site, ceci ouvrirait une page détaillée ou une modal
        alert(`Les détails de l'itinéraire "${itineraryId}" seraient affichés ici.`);
    });
});
