export const selectMyBooksMap = (state) => {
    return state.mybooks.reduce((book) => {
        const { mybooks } = book;
        return mybooks
    }, {})
}