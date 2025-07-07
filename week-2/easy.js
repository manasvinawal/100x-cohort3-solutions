/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < str1.length; i++) {
    count[str1.charCodeAt(i) - 97]++;
    count[str2.charCodeAt(i) - 97]--;
  }

  return count.every(val => val === 0);
}
