import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {
    reloadCoursesList,
    deleteCourse,
    reloadCourse
} from '../actions/courseActions'

const mapStateToProps = state => {
    return{
    courses: state.courseReducer ? state.courseReducer.courses : []
}}

const mapDispatchToProps = dispatch => ({
    reloadCoursesList: () => reloadCoursesList(dispatch),
    deleteCourse: (courseId) => deleteCourse(dispatch, courseId),
    reloadCourse: (courseId) => reloadCourse(dispatch, courseId)
})

const ListCoursesComponent = (props) => {
    useEffect(()=>{
        props.reloadCoursesList();
    }, []);

    const addCourse = () => {
        props.history.push('/add-course');
    }

    const editCourse = (courseId) => {
        console.log(courseId);
        window.localStorage.setItem("courseId", courseId);
        props.history.push('/edit-course');
        props.reloadCourse(window.localStorage.getItem("courseId"));
    }

 return(
<>
    <h2 className="text-center">Course Details</h2>
    <button className="btn btn-danger" style={{width:'100px'}} onClick={() => addCourse()}>Add Course</button>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
            </tr>
        </thead>
        <tbody>
            {
                props.courses.map(
            course =>
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.author}</td>
                            <td>{course.category}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => props.deleteCourse(course.id)}>Delete</button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => editCourse(course.id)}>Edit</button>
                            </td>
                        </tr>
                )
            }
        </tbody>
    </table>

</>
 )
}

ListCoursesComponent.defaultProps = {
    courses: []
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCoursesComponent);