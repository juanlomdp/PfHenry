const getAllBooks = require('./getAllBooks');


const searchBooks = async (search) => {

    const allBooks = await getAllBooks();

    if (search){

        const booksFiltered = allBooks.filter((book) => {
            const bookTitle = book.title.toLowerCase();
            // const bookAuthor = book.author.toLowerCase();

            return bookTitle.includes(search.toLowerCase()) 
            // || bookAuthor.includes(search.toLowerCase());
        })
    
        if (booksFiltered.length === 0) {
            throw Error(`No recipes have been found matching your search: title:'${title}', author='${author}'`)
        }
        return booksFiltered;
    }
};

module.exports = searchBooks;