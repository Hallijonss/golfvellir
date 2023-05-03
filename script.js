// Define the golf courses
let golfCourses;

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    golfCourses = data;
    // do something with the golfCourses variable
  });

// Get user's current location
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Calculate distance between two locations using Haversine formula
function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

// Convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

async function appendDistanceToGolfCourses(golfCourses, userLocation, sortBy) {
  return golfCourses.map((golfCourse) => ({
    ...golfCourse,
    distance: getDistanceFromLatLonInKm(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      golfCourse.lat,
      golfCourse.lng
    )
  })).sort((a, b) => a[sortBy] - b[sortBy]);
}

  
async function showNearestGolfCourses() {
  const userLocation = await getUserLocation();
  const golfCoursesWithDistance = await appendDistanceToGolfCourses(golfCourses, userLocation);
  const nearestGolfCourses = golfCoursesWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 65);

  const container = document.createElement("div");
  container.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "px-4");

  // Create a div for each golf course
  nearestGolfCourses.forEach((golfCourse) => {
    const div = document.createElement("div");
    div.classList.add("bg-white", "shadow", "rounded-lg", "overflow-hidden");

    const name = document.createElement("h3");
    name.classList.add("text-lg", "font-medium", "text-gray-900", "p-3");
    name.textContent = golfCourse.Name;

    const details = document.createElement("div");
    details.classList.add("px-3", "py-2");

    const hole = document.createElement("p");
    hole.classList.add("text-gray-600", "text-sm");
    hole.textContent = `Fjöldi hola: ${golfCourse.Holur}`;

    const distance = document.createElement("p");
    distance.classList.add("text-gray-600", "text-sm");
    distance.textContent = `Fjarlægð (km): ${golfCourse.distance.toFixed(1)}`;

    const price = document.createElement("p");
    price.classList.add("text-gray-600", "text-sm");
    price.textContent = `Verð: ${golfCourse.Almennt_gjald}`;

    const discount = document.createElement("p");
    discount.classList.add("text-gray-600", "text-sm");
    discount.textContent = `Afsláttur: ${golfCourse.afslattargjald}`;

    const discountType = document.createElement("p");
    discountType.classList.add("text-gray-600", "text-sm");
    discountType.textContent = `Tegund Afsláttar: ${golfCourse.Athugasemd}`;

    const location = document.createElement("a");
    location.classList.add("text-blue-600", "text-sm");
    location.href = golfCourse.Location;
    location.textContent = "Staðsetning";

    const website = document.createElement("p");
    website.classList.add("text-gray-600", "text-sm");
    if (golfCourse.Website) {
      const websiteLink = document.createElement("a");
      websiteLink.href = golfCourse.Website;
      websiteLink.textContent = "Vefsíða";
      website.appendChild(websiteLink);
    } else {
      website.textContent = "Vefsíða: N/A";
    }

    details.appendChild(hole);
    details.appendChild(distance);
    details.appendChild(price);
    details.appendChild(discount);
    details.appendChild(discountType);
    details.appendChild(location);
    details.appendChild(website);

    div.appendChild(name);
    div.appendChild(details);

    container.appendChild(div);
  });

  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(container);
}

//////Cheapest almennt
async function showCheapestGolfCourses() {
  const userLocation = await getUserLocation();
  const golfCoursesWithDistance = await appendDistanceToGolfCourses(golfCourses, userLocation);
  const nearestGolfCourses = golfCoursesWithDistance
    .sort((a, b) => a.Almennt_gjald - b.Almennt_gjald)
    .slice(0, 65);

    const container = document.createElement("div");
    container.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "px-4");
  
    // Create a div for each golf course
    nearestGolfCourses.forEach((golfCourse) => {
      const div = document.createElement("div");
      div.classList.add("bg-white", "shadow", "rounded-lg", "overflow-hidden");
  
      const name = document.createElement("h3");
      name.classList.add("text-lg", "font-medium", "text-gray-900", "p-3");
      name.textContent = golfCourse.Name;
  
      const details = document.createElement("div");
      details.classList.add("px-3", "py-2");
  
      const hole = document.createElement("p");
      hole.classList.add("text-gray-600", "text-sm");
      hole.textContent = `Fjöldi hola: ${golfCourse.Holur}`;
  
      const distance = document.createElement("p");
      distance.classList.add("text-gray-600", "text-sm");
      distance.textContent = `Fjarlægð (km): ${golfCourse.distance.toFixed(1)}`;
  
      const price = document.createElement("p");
      price.classList.add("text-gray-600", "text-sm");
      price.textContent = `Verð: ${golfCourse.Almennt_gjald}`;
  
      const discount = document.createElement("p");
      discount.classList.add("text-gray-600", "text-sm");
      discount.textContent = `Afsláttur: ${golfCourse.afslattargjald}`;
  
      const discountType = document.createElement("p");
      discountType.classList.add("text-gray-600", "text-sm");
      discountType.textContent = `Tegund Afsláttar: ${golfCourse.Athugasemd}`;
  
      const location = document.createElement("a");
      location.classList.add("text-blue-600", "text-sm");
      location.href = golfCourse.Location;
      location.textContent = "Staðsetning";
  
      const website = document.createElement("p");
      website.classList.add("text-gray-600", "text-sm");
      if (golfCourse.Website) {
        const websiteLink = document.createElement("a");
        websiteLink.href = golfCourse.Website;
        websiteLink.textContent = "Vefsíða";
        website.appendChild(websiteLink);
      } else {
        website.textContent = "Vefsíða: N/A";
      }
  
      details.appendChild(hole);
      details.appendChild(distance);
      details.appendChild(price);
      details.appendChild(discount);
      details.appendChild(discountType);
      details.appendChild(location);
      details.appendChild(website);
  
      div.appendChild(name);
      div.appendChild(details);
  
      container.appendChild(div);
    });
  
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(container);
  }
  

//////Cheapest afslattur
async function showCheapestDiscountGolfCourses() {
  const userLocation = await getUserLocation();
  const golfCoursesWithDistance = await appendDistanceToGolfCourses(golfCourses, userLocation);
  const nearestGolfCourses = golfCoursesWithDistance
    .sort((a, b) => a.afslattargjald - b.afslattargjald)
    .slice(0, 65);

    const container = document.createElement("div");
    container.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "px-4");
  
    // Create a div for each golf course
    nearestGolfCourses.forEach((golfCourse) => {
      const div = document.createElement("div");
      div.classList.add("bg-white", "shadow", "rounded-lg", "overflow-hidden");
  
      const name = document.createElement("h3");
      name.classList.add("text-lg", "font-medium", "text-gray-900", "p-3");
      name.textContent = golfCourse.Name;
  
      const details = document.createElement("div");
      details.classList.add("px-3", "py-2");
  
      const hole = document.createElement("p");
      hole.classList.add("text-gray-600", "text-sm");
      hole.textContent = `Fjöldi hola: ${golfCourse.Holur}`;
  
      const distance = document.createElement("p");
      distance.classList.add("text-gray-600", "text-sm");
      distance.textContent = `Fjarlægð (km): ${golfCourse.distance.toFixed(1)}`;
  
      const price = document.createElement("p");
      price.classList.add("text-gray-600", "text-sm");
      price.textContent = `Verð: ${golfCourse.Almennt_gjald}`;
  
      const discount = document.createElement("p");
      discount.classList.add("text-gray-600", "text-sm");
      discount.textContent = `Afsláttur: ${golfCourse.afslattargjald}`;
  
      const discountType = document.createElement("p");
      discountType.classList.add("text-gray-600", "text-sm");
      discountType.textContent = `Tegund Afsláttar: ${golfCourse.Athugasemd}`;
  
      const location = document.createElement("a");
      location.classList.add("text-blue-600", "text-sm");
      location.href = golfCourse.Location;
      location.textContent = "Staðsetning";
  
      const website = document.createElement("p");
      website.classList.add("text-gray-600", "text-sm");
      if (golfCourse.Website) {
        const websiteLink = document.createElement("a");
        websiteLink.href = golfCourse.Website;
        websiteLink.textContent = "Vefsíða";
        website.appendChild(websiteLink);
      } else {
        website.textContent = "Vefsíða: N/A";
      }
  
      details.appendChild(hole);
      details.appendChild(distance);
      details.appendChild(price);
      details.appendChild(discount);
      details.appendChild(discountType);
      details.appendChild(location);
      details.appendChild(website);
  
      div.appendChild(name);
      div.appendChild(details);
  
      container.appendChild(div);
    });
  
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(container);
  }
  

  