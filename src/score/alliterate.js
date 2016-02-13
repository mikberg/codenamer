export default function alliterate() {
  return (words) => {
    const prefix = words[0][0];
    for (let idx = 1; idx < words.length; idx++) {
      if (!words[idx].startsWith(prefix)) {
        return 0;
      }
    }
    return 1;
  };
}
