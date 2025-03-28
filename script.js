const myLibrary = []

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

}

Book.prototype.toggleReadStatus = function(){
    this.read = this.read === "Read" ? "Not Read" : "Read";
};

function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
}

addBookToLibrary("My Brilliant Friend (Neapolitan)", "Elena Ferrante", 331, "Read")
addBookToLibrary("The Story of a New Name: A Novel (Neapolitan Novels, 2) ", "Elena Ferrante", 471, "Not Read")

addBookToLibrary("Those Who Leave and Those Who Stay: A Novel (Neapolitan Novels, 3) ", "Elena Ferrante", 400, "Not Read")
addBookToLibrary("The Story of the Lost Child: A Novel (Neapolitan Novels, 4) ", "Elena Ferrante", 480, "Read")


console.log (myLibrary)



function showOnShelf(arr){
    const bookshelf = document.querySelector("#bookshelf")
    bookshelf.innerHTML = "";
    for(let book of arr){
        const showBook = document.createElement("div")
        showBook.textContent = `- ${book.title}, ${book.author}, ${book.pages}, ${book.read}  `
        bookshelf.appendChild(showBook)

        const remove = document.createElement("button")
        remove.classList.add("remove")
        remove.dataset.bookID = book.id;
        remove.textContent = "Remove";
        showBook.appendChild(remove)

        const read = document.createElement("button")
        read.classList.add("read") 
        read.dataset.bookID = book.id;
        read.textContent = book.read === "Read" ? "Not Read" : "Read";
        showBook.appendChild(read)

    }
    addRemoveListeners()
    addReadListeners()

}


function addRemoveListeners(){

const removeBtns = document.querySelectorAll(".remove")

removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click",()=>{
        const removeID = removeBtn.dataset.bookID;
        let rmvIndex = myLibrary.findIndex(myLibrary => myLibrary.id ===removeID)
        if (rmvIndex !== -1){
            myLibrary.splice(rmvIndex,1)
        }
        showOnShelf(myLibrary)

      
});

})

} 

function addReadListeners(){
    const readBtns = document.querySelectorAll(".read")

    readBtns.forEach((readBtn)=> {
        readBtn.addEventListener("click", (e)=>{
            const readID = e.target.dataset.bookID;
            let readIndex = myLibrary.findIndex((book)=> book.id === readID)
            if (readID !== -1){
                myLibrary[readIndex].toggleReadStatus();
            }
            showOnShelf(myLibrary)
        })
    })

}


showOnShelf(myLibrary)
