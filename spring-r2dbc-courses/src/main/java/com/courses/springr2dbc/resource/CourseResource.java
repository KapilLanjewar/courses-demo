package com.courses.springr2dbc.resource;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courses.springr2dbc.domain.Course;
import com.courses.springr2dbc.repository.CourseRepository;

import reactor.core.publisher.Mono;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/courses")
public class CourseResource {

	private final CourseRepository courseRepository;

    public CourseResource(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    
    @GetMapping
    public Mono<List<Course>> getAllCourses() {
        return courseRepository.findAll().collectList();
    }

    @GetMapping(value = "/{id}")
    public Mono<Course> findById(@PathVariable Long id) {
        return courseRepository.findById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Course> save(@RequestBody Course course) {
        return courseRepository.save(course);
    }
    
    @PutMapping("/{id}")
    public Mono<Course> update(@PathVariable("id") Long id, @RequestBody Course course) {
        return courseRepository.findById(id)
                .map(p -> {
                    p.setTitle(course.getTitle());
                    p.setAuthor(course.getAuthor());
                    p.setCategory(course.getCategory());
                    return p;
                })
                .flatMap(p -> courseRepository.save(p));
    }

    @DeleteMapping(value = "/{id}")
    public Mono<Void> delete(@PathVariable Long id) {
        return courseRepository.deleteById(id);
    }
	
}
