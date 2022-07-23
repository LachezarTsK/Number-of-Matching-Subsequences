
#include <array>
#include <vector>
using namespace std;

class Solution {

    struct WordData {
        int indexInWord{};
        int indexOfWordInInput{};
        WordData(int indexOfWordInInput) : indexOfWordInInput {indexOfWordInInput}{}
    };

    inline static const int ALPHABET_SIZE = 26;

public:
    int numMatchingSubseq(string wordToCheck, vector<string>& words) {
        array<vector<WordData>, ALPHABET_SIZE> wordData{};
        initializeWordData(words, wordData);
        return countMatchingSubsequencies(wordToCheck, words, wordData);
    }

private:
    int countMatchingSubsequencies(const string& wordToCheck, const vector<string>& words, array<vector<WordData>, ALPHABET_SIZE>& wordData) {

        int matchingSubsequencies = 0;
        for (int i = 0; i < wordToCheck.length(); ++i) {

            char current = wordToCheck[i];
            vector<WordData> previousGroup = wordData[current - 'a'];
            wordData[current - 'a'].clear();

            for (auto& w : previousGroup) {
                if (++w.indexInWord == words[w.indexOfWordInInput].length()) {
                    ++matchingSubsequencies;
                    continue;
                }
                wordData[words[w.indexOfWordInInput][w.indexInWord] - 'a'].push_back(w);
            }
            previousGroup.clear();
        }
        return matchingSubsequencies;
    }

    void initializeWordData(const vector<string>& words, array<vector<WordData>, ALPHABET_SIZE>& wordData) {
        int index = 0;
        for (const auto& w : words) {
            wordData[w[0] - 'a'].emplace_back(WordData(index));
            ++index;
        }
    }
};
