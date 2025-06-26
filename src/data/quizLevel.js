const levels = [
  { min: 0, max: 4, label: "初級" },
  { min: 5, max: 8, label: "中級" },
  { min: 9, max: 9, label: "上級" },
];

export function getLevelLabel(questionIndex) {
  const level = levels.find(
    (level) => questionIndex >= level.min && questionIndex <= level.max
  );
  return level ? level.label : "";
}

export default levels;
