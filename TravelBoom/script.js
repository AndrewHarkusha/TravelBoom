// ---------------
//  Task 6: Fetch Data
// ---------------
async function fetchRecommendations() {
    try {
      //const response = await fetch('travel_recommendation_api.json');
      const response = await fetch('travel1.json');
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const data = await response.json();
  
      // Check the console to ensure data is fetched correctly (Task 6 requirement)
      console.log('Fetched data:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // ---------------
  //  Task 7 & 8: Keyword Searches & Display Recommendations
  // ---------------
  // We will match user input for "beach", "temple", or "country" (in any case).
  // Then display at least two recommendations for each keyword.
  
  async function handleSearch() {
    // Get the user input
    const searchInput = document.getElementById('search-input');
    let keyword = searchInput.value.trim().toLowerCase();
  
    // Only proceed if user entered something
    if (!keyword) {
      alert('Please enter a keyword: beach, temple, or country.');
      return;
    }
  
    // Allowed variations for "beach"/"temple"/"country".
    // For example, "beaches" or "temples" or "countries" might appear.
    // We'll simplify by checking if the keyword includes the base word.
    let baseType = '';
    if (keyword.includes('beach')) {
      baseType = 'beach';
    } else if (keyword.includes('temple')) {
      baseType = 'temple';
    } else if (keyword.includes('country')) {
      baseType = 'country';
    } else {
      // If the keyword doesn't match any known type, alert user or show a message
      alert('No results found for "' + keyword + '". Try beach, temple, or country.');
      return;
    }
  
    // Fetch the JSON data
    const data = await fetchRecommendations();
  
    // Filter for matching recommendations
    const matchingPlaces = data.filter(item => item.type === baseType);
  
    // Now display the results in the #results container
    displayResults(matchingPlaces, baseType);
  }
  
  // This function creates HTML elements to show the results on the page
  function displayResults(placesArray, baseType) {
    const resultsContainer = document.getElementById('results');
    // Clear old results first
    resultsContainer.innerHTML = '';
  
    // If no matches found, display a message
    if (placesArray.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = `No ${baseType} recommendations found.`;
      resultsContainer.appendChild(noResults);
      return;
    }
  
    // Otherwise, create cards for each place
    placesArray.forEach(place => {
      // Create a card wrapper
      const card = document.createElement('div');
      card.classList.add('recommendation-card');
  
      // Image
      const img = document.createElement('img');
      img.src = place.imageUrl;
      img.alt = place.name;
      card.appendChild(img);
  
      // Title
      const title = document.createElement('h3');
      title.textContent = place.name;
      card.appendChild(title);
  
      // Description
      const desc = document.createElement('p');
      desc.textContent = place.description;
      card.appendChild(desc);
  
      // Append card to results container
      resultsContainer.appendChild(card);
    });
  }
  
  // ---------------
  // Task 9: Clear Button
  // ---------------
  function handleClear() {
    // Clear the search field
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
  
    // Clear any displayed results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  }
  
  // ---------------
  // Task 10 (Optional): Country Date & Time
  // ---------------
  // Example function to log the current time in New York (or any chosen time zone).
  function showOptionalTime() {
    const options = {
      timeZone: 'America/New_York',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    console.log('Current time in New York:', newYorkTime);
  }
  
  // ---------------
  // Event Listeners (connect buttons to JS)
  // ---------------
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const clearButton = document.getElementById('clear-btn');
  
    if (searchButton) {
      searchButton.addEventListener('click', handleSearch);
    }
  
    if (clearButton) {
      clearButton.addEventListener('click', handleClear);
    }
  
    // OPTIONAL: Immediately show or log the time in New York
    // showOptionalTime();
  });
  