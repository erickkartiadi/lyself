function capitalizeEachWord(text: string) {
  return text.trim().replace(/^\w/, (c) => c.toUpperCase());
}

export default capitalizeEachWord;
