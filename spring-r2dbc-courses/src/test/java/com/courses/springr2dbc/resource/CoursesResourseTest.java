package com.courses.springr2dbc.resource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.Duration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.r2dbc.DataR2dbcTest;
import org.springframework.data.r2dbc.core.DatabaseClient;

import com.courses.springr2dbc.repository.CourseRepository;

import reactor.test.StepVerifier;

@DataR2dbcTest
public class CoursesResourseTest {
	
	@Autowired
    DatabaseClient client;
	
	@Autowired
	CourseRepository courseRepository;
	
	@Test
    public void testDatabaseClientExisted() {
        assertNotNull(client);
    }
	
	@Test
    public void testPostRepositoryExisted() {
        assertNotNull(courseRepository);
    }

	@Test
    public void testInsertAndQuery() {
        this.client.insert()
            .into("course")
            .value("id", new Long(4))
            .value("title", "testtitle")
            .value("author", "testauthor")
            .value("category", "testcategory")
            .then().block(Duration.ofSeconds(5));

        courseRepository.findById(new Long(4))
            .as(StepVerifier::create)
            .consumeNextWith(p -> assertEquals("testtitle", p.getTitle()))
            .verifyComplete();

    }
	
	@Test
    public void testInsertAndDelete() {
		this.client.insert()
	        .into("course")
	        .value("id", new Long(5))
	        .value("title", "testtitle")
	        .value("author", "testauthor")
	        .value("category", "testcategory")
	        .then().block(Duration.ofSeconds(5));
		
		courseRepository.deleteById(new Long(5)).as(StepVerifier::create)
		    .expectNextCount(0)
		    .verifyComplete();
	}
	
}
