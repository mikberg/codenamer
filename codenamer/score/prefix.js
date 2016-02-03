export default function prefix(pre) {
  return (words) => {
    for (let idx = 0; idx < words.length; idx++) {
      if (!words[idx].startsWith(pre)) {
        return 0;
      }
    }
    return 1;
  };
}
