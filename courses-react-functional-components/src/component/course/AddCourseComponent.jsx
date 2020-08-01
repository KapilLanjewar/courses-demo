import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {
    addCourse
} from '../actions/courseActions'

const mapStateToProps = state => {
    return{
    courses: state.courseReducer ? state.courseReducer.courses : []
}}

const mapDispatchToProps = dispatch => ({
    addCourse: (course) => addCourse(dispatch, course)
})

const AddCourseComponent = (props) => {

    let [course, setCourse] = useState({
	    title: '',
	    author: '',
	    category: ''
	});

	let handleChange = (e) => {
	    let name = e.target.name;
	    let value = e.target.value;
	    course[name] = value;
	    setCourse(course);
	}

	const save = (course) => {
        props.addCourse(course);
        props.history.push('/');
    }

	return(
		<div>
            <h2 className="text-center">Add Course</h2>
            
                <div className="form-group">
                    <label>Course Title:</label>
                    <input type="text" placeholder="title" name="title" className="form-control" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Course Author:</label>
                    <input type="text" placeholder="author" name="author" className="form-control" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Course Category:</label>
                    <input type="text" placeholder="category" name="category" className="form-control" onChange={handleChange}/>
                </div>

                <button className="btn btn-success" onClick={() => save(course)}>Save</button>
            
    	</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCourseComponent);