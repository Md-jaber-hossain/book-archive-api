const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    document.getElementById('search-result').textContent ='';
    document.getElementById('book-numbers').textContent = '';

    // clear data
    searchField.value = '';

    if (searchText === '') {

        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // load data
        const url = `https://openlibrary.org/search.json?q==${searchText}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
            
    }
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

}
// Display Search Result
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    console.log(books);
    if (books.length === 0) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${books.length}`;
        // Retrieve each book and display in a card
        books.forEach(book => {
            const bookImg = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            const div = document.createElement('div');
            div.classList.add('col');
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