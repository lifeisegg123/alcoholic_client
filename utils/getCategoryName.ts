import { categoryOptions } from "components/alcohol/categoryOptions";

export const getCategoryName = (id: string) => {
  const targetId = Number(id);
  if (targetId === 0) {
    return "전체";
  }
  const target = categoryOptions.reduce((acc, category) => {
    if (acc) {
      return acc;
    }
    if (category.value + 1000 <= targetId) {
      return acc;
    } else {
      const [target] = category.children.filter((v) => {
        if (v.value === targetId) {
          return true;
        } else {
          return false;
        }
      });
      if (target) {
        return (acc = target);
      } else {
        return (acc = category);
      }
    }
  }, null as any);
  return target.label;
};
