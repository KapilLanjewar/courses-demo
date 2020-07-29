package com.courses.springr2dbc.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Table("course")
//@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {

	@Id
    private Long id;
	
	@Column(value = "title")
    private String title;

    @Column(value = "author")
    private String author;
    
    @Column(value = "category")
    private String category;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
    
}
