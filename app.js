const axios = require('axios');
const harryPotterApi = 'https://api.potterdb.com/v1';

//Get the list of books
async function getTheBooksList() {
    try {
        const booksList = await axios.get(`${harryPotterApi}/books`);
        return booksList.data.data;  // Return the list of books
    } catch (error) {
        handleError(error, 'getTheBooksList');
    }
}

//Get the list of chapters of a particular Book
async function getTheChaptersOfTheBook(bookId) {
    try {
        const chaptersList = await axios.get(`${harryPotterApi}/books/${bookId}/chapters`);
        return chaptersList.data.data;  // Return the list of chapters for the book
    } catch (error) {
        handleError(error, 'getTheChaptersOfTheBook');
    }
}

function handleError(errorStack, functionName) {
    console.log(`There was an error in ${functionName}. Please check the stack for more info on the error => ${errorStack}`);
}

async function printLastChapterSummary() {
    try {
        //Get the list of all the Books
        const booksList = await getTheBooksList();
        if (!booksList || booksList.length === 0) {
            console.error('No Books Found in the Record');
        }

        //Get the ID of the first Book
        const firstBook = booksList[0];
        const bookId = firstBook.id;

        //Get all the chapters of the First Book
        const chaptersList = await getTheChaptersOfTheBook(bookId);
        if (!chaptersList || chaptersList.length === 0) {
            console.error('No Chapters Found for the selected Book');
        }

        const lastChapterOfTheBook = chaptersList[chaptersList.length - 1];
        const summaryOfTheLastChapter = lastChapterOfTheBook.attributes.summary;
        console.log("The summary of the last chapter of the first Book is as follows : ", summaryOfTheLastChapter);
    } catch (error) {
        handleError(error, 'printLastChapterSummary');
    }
}

//Call the function to Print the Last Chapter Summary of a particular Book
printLastChapterSummary();

