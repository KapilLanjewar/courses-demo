package com.courses.springr2dbc.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.courses.springr2dbc.domain.Course;

public interface CourseRepository extends R2dbcRepository<Course, Long> {

}
