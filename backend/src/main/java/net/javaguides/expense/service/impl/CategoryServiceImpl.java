package net.javaguides.expense.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.expense.Mapper.CategoryMapper;
import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.entity.Category;
import net.javaguides.expense.exceptions.ResourceNotFoundException;
import net.javaguides.expense.repository.CategoryRepository;
import net.javaguides.expense.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;



    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {

        Category category= CategoryMapper.mapToCategory(categoryDto);
        Category savedCategory =categoryRepository.save(category);
        return CategoryMapper.mapToCategoryDto(savedCategory);


    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
          Category category= categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category not found with id :" +categoryId));


        return CategoryMapper.mapToCategoryDto(category);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category>categories=categoryRepository.findAll();
        return categories.stream()
                .map((category)->CategoryMapper.mapToCategoryDto(category))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto updateCategory(Long categoryId, CategoryDto categoryDto) {
        //get category entity from database
        Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category not found with id :" +categoryId));
        //update
        category.setName(categoryDto.name());
        Category updateCategory=categoryRepository.save(category);
        return CategoryMapper.mapToCategoryDto(updateCategory);
    }

    @Override
    public void deleteCategoryById(Long categoryId) {
       Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category not found with id :" +categoryId));
        categoryRepository.delete(category);
    }
}
