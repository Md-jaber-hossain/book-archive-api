const searchBook = () => {
    // getting input value
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    // clear input value
    inputField.value = '';
    // clear search result and books count
    document.getElementById('search-result').textContent ='';
    // clear books count
    bookCountDisplay('');
    // error message hide
    errorEmptyDisplay('none');
    errorInvalidDisplay('none');
    // display the spinner
    spinnerDisplay('block');

    // chech the input field enpty or not
    if (inputValue === '') {

        errorEmptyDisplay('block');
        errorInvalidDisplay('none');
        spinnerDisplay('none');
        bookCountDisplay('');
    }
    else {
        // fetch the data and call the function
        const url = `https://openlibrary.org/search.json?q==${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs, data.numFound));
            
    }
}
// function for error message show or hide
const errorEmptyDisplay = (errorEmptyValue) =>{
    document.getElementById('error-message-empty').style.display = errorEmptyValue;
}
// function for error message show or hide
const errorInvalidDisplay = (errorInvalidValue) =>{
    document.getElementById('error-message-invalid').style.display = errorInvalidValue;
}
// function for books count show or hide
const bookCountDisplay = (bookCountValue) =>{
    document.getElementById('book-count').textContent = bookCountValue;
}
// function for spinner show or hide
const spinnerDisplay = (spinnerValue) =>{
    document.getElementById('spinner').style.display = spinnerValue;
}

// getting the array books from search
const displaySearchResult = (booksArray, numFound) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // hide the error message and spinner
    errorInvalidDisplay('none');
    errorEmptyDisplay('none');
    spinnerDisplay('none');

    // chech the array book length
    if (booksArray.length === 0) {

        errorInvalidDisplay('block');
        errorEmptyDisplay('none');
        spinnerDisplay('none');
        bookCountDisplay('');
    }
    else {
        // books count calculation and show all
        document.getElementById('book-count').innerText = `Books Found : ${numFound}`;

        // loop from array 30 books
        const books = booksArray.slice(0,30);
        books.forEach(book => {

            // dynamically set the images
            const bookImg = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            const publisherName = book.publisher.slice(0,1);
            // create the div
            const div = document.createElement('div');
            div.classList.add('col');
            // inside the div, set all the images and book details 
            div.innerHTML = `
            <div  class="card h-100">
                <img height="400px" src="${bookImg? bookImg: " "}" class="w-100 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><b>Book Name:</b> ${book.title? book.title: " "}</h5>
                    <p class="card-text"><b>Author Name:</b> ${book.author_name? book.author_name : " " }</p>
                    <p class="card-text"><b>Publisher Name:</b> ${publisherName? publisherName: " "}</p>
                    <p class="card-text"><b>First Published:</b> ${book.first_publish_year? book.first_publish_year: " "}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
}