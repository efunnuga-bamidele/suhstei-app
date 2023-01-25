// use flatMap top iterate througe a nested array and map to iterate through final array
export const selectMyBooksMap = (state) => state.mybooks.myBooksMap.flatMap((items) => [...items['mybooks'].map(item => item)])

