
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private static final int ALPHABET_SIZE = 26;

    public int numMatchingSubseq(String wordToCheck, String[] words) {
        List<WordData>[] wordData = new List[ALPHABET_SIZE];
        initializeWordData(words, wordData);
        return countMatchingSubsequencies(wordToCheck, words, wordData);
    }

    private int countMatchingSubsequencies(String wordToCheck, String[] words, List<WordData>[] wordData) {

        int matchingSubsequencies = 0;
        for (int i = 0; i < wordToCheck.length(); ++i) {

            char current = wordToCheck.charAt(i);
            List<WordData> previousGroup = wordData[current - 'a'];
            wordData[current - 'a'] = new ArrayList<>();

            for (WordData w : previousGroup) {
                if (++w.indexInWord == words[w.indexOfWordInInput].length()) {
                    ++matchingSubsequencies;
                    continue;
                }
                wordData[words[w.indexOfWordInInput].charAt(w.indexInWord) - 'a'].add(w);
            }
            previousGroup.clear();
        }
        return matchingSubsequencies;
    }

    private void initializeWordData(String[] words, List<WordData>[] wordData) {
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            wordData[i] = new ArrayList<>();
        }
        for (int i = 0; i < words.length; ++i) {
            wordData[words[i].charAt(0) - 'a'].add(new WordData(i));
        }
    }
}

class WordData {

    int indexInWord;
    int indexOfWordInInput;

    WordData(int indexOfWordInInput) {
        this.indexOfWordInInput = indexOfWordInInput;
    }
}
