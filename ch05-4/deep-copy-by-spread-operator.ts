const oArray = [1, 2, 3, 4]
const deppCopiedArray = [...oArray]
deppCopiedArray[0] = 0
console.log(oArray, deppCopiedArray)