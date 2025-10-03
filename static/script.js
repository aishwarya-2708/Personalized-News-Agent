let darkMode = false;

// Dark Mode
function toggleDarkMode(){
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
}

// Toggle Filters
function toggleFilter(){
  document.getElementById("filterContent").classList.toggle("show");
}

// Trending topics
function loadTrending(){
  const trendingTopics = [
    "AI in India",
    "Cricket World Cup",
    "Stock Market Today",
    "SpaceX Launch",
    "Health Tech 2025",
    "Microsoft AI News",
    "India's Economy",
    "Global Politics",
    "Renewable Energy"
  ];
  const container = document.querySelector("#trendingList .marquee-content");
  container.innerHTML = trendingTopics.map(t=>`<span onclick="searchTopic('${t}')">${t}</span>`).join(' • ');
}

function searchTopic(topic){
  document.getElementById("topicInput").value = topic;
  applyFilters();
}

// Fetch news from Flask API
async function applyFilters(){
  const topic = document.getElementById("topicInput").value.trim();
  if(!topic) return alert("Please enter a topic!");

  const language = document.getElementById("language").value;
  const region = document.getElementById("region").value;
  const category = document.getElementById("category").value;
  const dateRange = document.getElementById("dateRange").value;

  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = `<p class="loading">Loading news...</p>`;

  try{
    const res = await fetch("/get_news", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({topic, language})
    });
    const data = await res.json();

    if(data.length===0){
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }

    newsContainer.innerHTML = "";

    data.forEach(article=>{
      const card = document.createElement("div");
      card.className = "card";

      const bullets = article.summary.map(s=>`<li>${s}</li>`).join("");

      card.innerHTML = `
        <h3>${article.title}</h3>
        <ul>${bullets}</ul>
        <div class="actions">
          <button onclick="speakText('${article.summary.join('. ')}','${language}')">🔊 Listen</button>
          
          <a href="${article.url}" target="_blank" class="read-more">🔗 Read More</a>
        </div>
      `;
      newsContainer.appendChild(card);
    });

  }catch(err){
    newsContainer.innerHTML = "<p class='error'>Error fetching news.</p>";
    console.error(err);
  }
}

// TTS
function speakText(text, lang){
  let voiceLang = "en-US";
  if(lang==="hi") voiceLang="hi-IN";
  if(lang==="mr") voiceLang="mr-IN";

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceLang;
  speechSynthesis.speak(utterance);
}

// Share button toggle - FINALIZED FOR FIXED POSITIONING AND CENTERING
function toggleShare(btn){
  const options = btn.nextElementSibling;
  const isShowing = options.classList.contains('show');

  // 1. Close any other open share options
  document.querySelectorAll('.share-options.show').forEach(openOption => {
    if (openOption !== options) {
      openOption.classList.remove('show');
      openOption.classList.remove('fixed-position'); // Clean up old fixed position
    }
  });
  
  // 2. Toggle the current one
  if (!isShowing) {
    // Calculate position relative to viewport
    const rect = btn.getBoundingClientRect();
    
    // Calculate the left position to center the dropdown under the button
    // Dropdown width is approx 120px (min-width is 120px in CSS)
    const dropdownWidth = 120; 
    const centeredLeft = rect.left + (rect.width / 2) - (dropdownWidth / 2);

    // Apply fixed position and calculated coordinates
    options.style.top = `${rect.bottom + 5}px`; // 5px below the button
    options.style.left = `${centeredLeft}px`;
    options.classList.add('fixed-position');
  }

  options.classList.toggle("show");
}

// Close filter content and share options when clicking outside
document.addEventListener('click', function(event) {
  const filterDropdown = document.querySelector('.filter-dropdown');
  const filterContent = document.getElementById('filterContent');
  if (filterDropdown && filterContent && !filterDropdown.contains(event.target)) {
    filterContent.classList.remove('show');
  }

  document.querySelectorAll('.share-btn').forEach(shareBtnParent => {
    if (!shareBtnParent.contains(event.target)) {
      const shareOptions = shareBtnParent.querySelector('.share-options');
      if (shareOptions && shareOptions.classList.contains('show')) {
        shareOptions.classList.remove('show');
        shareOptions.classList.remove('fixed-position'); 
      }
    }
  });
});

// NEW: Function to close dropdown and share when an option is clicked
document.querySelectorAll('.share-options a').forEach(link => {
    link.addEventListener('click', function() {
        // Find the parent .share-options
        const options = this.closest('.share-options');
        if (options) {
            options.classList.remove('show');
            options.classList.remove('fixed-position');
        }
    });
});