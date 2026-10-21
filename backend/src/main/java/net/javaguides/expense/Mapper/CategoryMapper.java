package net.javaguides.expense.Mapper;

import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.entity.Category;

public class CategoryMapper {

    //map categoryDto to category entity
    public static Category mapToCategory(CategoryDto categoryDto){
        return new Category(categoryDto.id(),categoryDto.name());
    }

    //Map Category entity to CategoryDto
    public static CategoryDto mapToCategoryDto(Category category) {
        return new CategoryDto(category.getId(),category.getName());
    }

}
