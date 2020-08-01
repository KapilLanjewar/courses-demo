import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {
    editCourse
} from '../actions/courseActions'

const mapStateToProps = state => {
    return{
    courses: state.courseReducer ? state.courseReducer.courses : [],
    reloadedcourse: state.courseReducer ? state.courseReducer.reloadedcourse : []
}}

const mapDispatchToProps = dispatch => ({
	editCourse: (course) => editCourse(dispatch, course)
})

const EditCourseComponent = (props) => {

	let [course, setCourse] = useState({
		id: '',
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

	const populateForm = (props) => {
    	document.getElementById("id").value = props.reloadedcourse.id;
    	document.getElementById("title").value = props.reloadedcourse.title;
    	document.getElementById("author").value = props.reloadedcourse.author;
    	document.getElementById("category").value = props.reloadedcourse.category;
    }

    const populateCourse = (props) => {
    	course['id'] = props.reloadedcourse.id;
    	course['title'] = props.reloadedcourse.title;
    	course['author'] = props.reloadedcourse.author;
    	course['category'] = props.reloadedcourse.category;
    	setCourse(course);
    }

    useEffect(()=>{
    	populateCourse(props);
    	populateForm(props);
    }, [props.reloadedcourse]);

    const update = (course) => {
        props.editCourse(course);
        props.history.push('/');
    }

    return(
		<div>
            <h2 className="text-center">Edit Course</h2>

        		<div className="form-group">
                    <label>Course Id:</label>
                    <input type="number" placeholder="id" id="id" name="id" className="form-control" readonly="true"/>
                </div>
            
                <div className="form-group">
                    <label>Course Title:</label>
                    <input type="text" placeholder="title" id="title" name="title" className="form-control" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Course Author:</label>
                    <input type="text" placeholder="author" id="author" name="author" className="form-control" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Course Category:</label>
                    <input type="text" placeholder="category" id="category" name="category" className="form-control" onChange={handleChange}/>
                </div>

                <button className="btn btn-success" onClick={() => update(course)}>Update</button>
    	</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCourseComponent);