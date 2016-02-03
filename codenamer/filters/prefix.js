export default function prefix(pre) {
  return (words) => {
    for (const idx in words) {
      if (!words[idx].startsWith(pre)) {
        return 0;
      }
    }
    return 1;
  };
}
