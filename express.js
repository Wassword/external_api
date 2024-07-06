// Function to fetch data based on country code and update HTML
async function fetchData(inputSource) {
try {
    const response = await fetch(`http://localhost:3000/${inputSource}`);
    const data = await response.json();

    // Update HTML elements with fetched data
    document.getElementById('titleArticle').textContent = data[0]?.title || 'No title available';
    document.getElementById('urlNews').textContent = data[0]?.url|| 'No link available';
    document.getElementById('sourceNews').textContent = data[0]?.source || 'No source available';


} catch (error) {
    console.error('Error fetching data:', error);
    // Handle error on the client side
    document.getElementById('output').innerHTML = 'Error fetching data. Please try again later.';
}
}

// Example: Fetch data when form is submitted
document.getElementById('query-form').addEventListener('submit', function(e) {
e.preventDefault();

const userInput = document.getElementById('inputSource').value;
fetchData(userInput);
});
