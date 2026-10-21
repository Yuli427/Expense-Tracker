package net.javaguides.expense.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;
@Tag(
        name="CRUD REST APIs for Category Resource",
        description = "CRUD REST APIs for Category Resource - Create Category"+"Update Category, Get Category, and Delete Category"
)
@AllArgsConstructor
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private CategoryService categoryService;

    @Operation(
            summary = "Create Category REST API to save category into database"

    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP STATUS 201 CREATED"
    )

    @PostMapping
    public ResponseEntity<CategoryDto>createCategory(@RequestBody CategoryDto categoryDto){

        CategoryDto category=categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }


    @Operation(
            summary = "Get Category REST API to get category in the database"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 GET"
    )


    //Get category Rest api
    @GetMapping("{id}")
    public ResponseEntity<CategoryDto>getCategoryById(@PathVariable("id")Long categoryId){
        CategoryDto category=categoryService.getCategoryById(categoryId);
        return   ResponseEntity.ok(category);
    }

    @Operation(
            summary = "Get all Categories REST API in the database"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 OK"
    )

    //get all REST API
    @GetMapping
    public ResponseEntity<List<CategoryDto>>getAllCategories(){
        List<CategoryDto>categories=categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @Operation(
            summary = "Update existed Category REST API"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 OK"
    )


    //update category REST API
    @PutMapping("{id}")
    public ResponseEntity<CategoryDto>updateCategory(@PathVariable("id") Long categoryId, @RequestBody CategoryDto categoryDto){
        CategoryDto updateCategory=categoryService.updateCategory(categoryId,categoryDto);

        return ResponseEntity.ok(updateCategory);

    }

    @Operation(
            summary = "Delete Category REST API"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 OK"
    )

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteCategoryById(@PathVariable("id")Long categoryId){
        categoryService.deleteCategoryById(categoryId);
        return ResponseEntity.ok("Category deleted successfully.");
    }

}
