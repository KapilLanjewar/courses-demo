import axios from 'axios';
import {
    GET_COURSES,
    GET_COURSE
} from './actionTypes';
import ApiService from "../../service/ApiService";
import data from './data'

const COURSE_API_BASE_URL = 'http://localhost:8080/courses';

export const successFetchCourses = (payload, key) => ({
    type: GET_COURSES,
    key,
    payload
});

export const reloadCoursesList = async(dispatch) => {
    try{
        const response = await axios(COURSE_API_BASE_URL);
        if(response.status === 200){
            dispatch(successFetchCourses( response, 'courses'));
        }
    } catch (exception){
        if(exception.isAxiosError){
            dispatch(successFetchCourses( data, 'courses'));
        }
    }
};

export const successFetchCourse = (dispatch, payload) => {
    dispatch({
        type: GET_COURSE,
        key: 'reloadedcourse',
        payload
    })
};

export const reloadCourse = async(dispatch, courseId) => {
    const response = await axios(COURSE_API_BASE_URL + '/' + courseId);
    if(response.status === 200){
        successFetchCourse(dispatch, response);
    }
};

export const deleteCourse = async(dispatch, courseId) => {
    const response = await axios.delete(COURSE_API_BASE_URL + '/' + courseId);
    if(response.status === 200){
        reloadCoursesList(dispatch);
    }
};

export const addCourse = async(dispatch, course) => {
    const response = await axios.post(COURSE_API_BASE_URL, course);
    if(response.status === 200){
        console.log('success');
    }
}

export const editCourse = async(dispatch, course) => {
    const response = await axios.put(COURSE_API_BASE_URL + '/' + course.id, course);
    if(response.status === 200){
        console.log('success');
    }
}