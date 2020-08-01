const initialState = {
    courses: [],
    reloadedcourse: []
}

const courseReducer = ( state = initialState, action) => {
    const { payload, key} = action;
    switch (action.type) {
        case 'GET_COURSES':
            return {...state, [key]: payload.data};
        case 'GET_COURSE':
            return {...state, [key]: payload.data};
        default:
            return {
                ...state
            }
    }
};

export default courseReducer;