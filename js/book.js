const searchBook = () => {
    // getting input value
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    // clear input value
    inputField.value = '';
    // clear search result and books count
    document.getElementById('search-result').textContent ='';
    document.getElementById('book-count').textContent = '';

    // chech the input field enpty or not
    if (inputValue === '') {

        displayErrorEmpty();
    }
    else {
        // display the spinner
        document.getElementById('search-result').textContent ='';
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('error-message-empty').style.display = 'none';
        document.getElementById('error-message-invalid').style.display = 'none';
        // fetch the data and call the function
        const url = `https://openlibrary.org/search.json?q==${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
            
    }
}

// error message function for empty input value
const displayErrorEmpty = () => {
    document.getElementById('error-message-empty').style.display = 'block';
    document.getElementById('error-message-invalid').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-count').textContent = '';

}
// error message function for invalid input value
const displayErrorInvalid = () => {
    document.getElementById('error-message-invalid').style.display = 'block';
    document.getElementById('error-message-empty').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-count').textContent = '';

}

// getting the array books from search
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // chech the array book length
    if (books.length === 0) {
        displayErrorInvalid();
    }
    else {
        // hide the error message and spinner
        document.getElementById('error-message-empty').style.display = 'none';
        document.getElementById('error-message-invalid').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        // books count show
        document.getElementById('book-count').innerText = `Books Found ${books.length}`;

        // loop from array books
        books.forEach(book => {

            // dynamically set the images
            const bookImg = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            // create the div
            const div = document.createElement('div');
            div.classList.add('col');
            // inside the div, set all the images and book details 
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="${bookImg? bookImg: " "}" class="w-100 h-75 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title? book.title: " "}</h5>
                    <p class="card-text">Author Name: ${book.author_name? book.author_name : " " }</p>
                    <p class="card-text">Publisher Name: ${book.publisher? book.publisher: " "}</p>
                    <p class="card-text">First Published: ${book.first_publish_year? book.first_publish_year: " "}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
}