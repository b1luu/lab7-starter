// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.
	return JSON.parse(localStorage.getItem('recipes') || '[]');
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element
	const main = document.querySelector('main');
	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	recipes.forEach(recipe => {
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipe;
		main.appendChild(recipeCard);
	  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage.
 * @param {Array<Object>} recipes An array of recipes
 */
 function saveRecipesToStorage(recipes) {
    // B1: Save the recipes array to localStorage under the key 'recipes'
    localStorage.setItem('recipes', JSON.stringify(recipes));
}


/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
 /**
 * Adds the necessary event handlers to <form> and the clear storage <button>.
 */
  function initFormHandler() {
    const form = document.querySelector('form'); // Get the form element
    const main = document.querySelector('main'); // Get the main container for appending cards
    const clearButton = document.querySelector('.danger'); // Get the clear button

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        
        // Ensure all required form fields are filled out
        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }

        const formData = new FormData(form);
        const recipeObject = {};
        formData.forEach((value, key) => {
            recipeObject[key] = value;
        });

        const newRecipeCard = document.createElement('recipe-card');
        newRecipeCard.data = recipeObject;
        main.appendChild(newRecipeCard);

        const recipes = getRecipesFromStorage();
        recipes.push(recipeObject);
        saveRecipesToStorage(recipes); // Save updated recipes list to localStorage
        form.reset(); // Reset the form fields after submission
    });

    clearButton.addEventListener('click', () => {
        localStorage.clear(); // Clear all data from localStorage
        main.innerHTML = ''; // Clear the display of recipe cards
    });
}


