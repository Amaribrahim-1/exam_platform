export function getMessage(pct) {
  if (pct >= 90)
    return { emoji: "🏆", text: "Outstanding!", sub: "Top of your class!" };
  if (pct >= 80)
    return {
      emoji: "🎉",
      text: "Great job! Well done!",
      sub: "You scored above 80% of your classmates",
    };
  if (pct >= 60)
    return {
      emoji: "👍",
      text: "Good effort!",
      sub: "Keep pushing, you're almost there",
    };
  return {
    emoji: "📚",
    text: "Keep studying!",
    sub: "You can do better next time",
  };
}
