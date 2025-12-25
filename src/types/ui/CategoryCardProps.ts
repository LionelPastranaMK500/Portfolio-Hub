import type { SkillCategoryDto } from "../../types/models/skillCategory";

export interface CategoryCardProps {
  category: SkillCategoryDto;
  onEditCategory: (cat: SkillCategoryDto) => void;
  onDeleteCategory: (id: number) => void;
}
