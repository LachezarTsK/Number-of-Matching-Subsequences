
/**
 * @param {string} wordToCheck
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (wordToCheck, words) {
    this.ALPHABET_SIZE = 26;
    this.ascii_a = 97;

    let wordData = new Array(ALPHABET_SIZE);
    initializeWordData(words, wordData);

    return countMatchingSubsequencies(wordToCheck, words, wordData);
};

/**
 * @param {string} wordToCheck
 * @param {string[]} words
 * @param {wordObject[][]} wordData
 * @return {number}
 */
function countMatchingSubsequencies(wordToCheck, words, wordData) {

    let matchingSubsequencies = 0;
    for (let i = 0; i < wordToCheck.length; ++i) {

        let current = wordToCheck.codePointAt(i);
        let previousGroup = wordData[current - this.ascii_a ];
        wordData[current - this.ascii_a ] = [];

        for (let w of previousGroup) {
            if (++w.indexInWord === words[w.indexOfWordInInput].length) {
                ++matchingSubsequencies;
                continue;
            }
            wordData[words[w.indexOfWordInInput].codePointAt(w.indexInWord) - this.ascii_a ].push(w);
        }
        previousGroup = [];
    }
    return matchingSubsequencies;
}

/**
 * @param {string[]} words
 * @param {wordObject[][]} wordData
 * @return {void}
 */
function initializeWordData(words, wordData) {
    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        wordData[i] = [];
    }
    for (let  i = 0; i < words.length; ++i) {
        wordData[words[i].codePointAt(0) - this.ascii_a].push(new WordData(i));
    }
}

/**
 * @param {number} indexOfWordInInput
 */
function  WordData(indexOfWordInInput) {
    this.indexInWord = 0;
    this.indexOfWordInInput = indexOfWordInInput;
}
