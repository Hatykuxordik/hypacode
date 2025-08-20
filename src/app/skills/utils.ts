export const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case "Expert":
      return "text-green-500";
    case "Advanced":
      return "text-blue-500";
    case "Intermediate":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export const getProficiencyWidth = (proficiency: string) => {
  switch (proficiency) {
    case "Expert":
      return "w-full";
    case "Advanced":
      return "w-4/5";
    case "Intermediate":
      return "w-3/5";
    default:
      return "w-2/5";
  }
};
