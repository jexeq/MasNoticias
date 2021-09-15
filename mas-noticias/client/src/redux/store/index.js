import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

var composeEnhancers = null;

if(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}

const ConfigureStore = () => {

    // try {
    //     var initialState = localStorage.getItem("user") ? {} : localStorage.setItem("user", "guest");
    // } catch (error) {
    //     console.log('getError', error)
    // }

    var initialState = {}
    

    if (composeEnhancers !== null) {

        return createStore(
            rootReducer, initialState,
            composeEnhancers(applyMiddleware(thunk))
        );
    } else {
        return createStore(
            rootReducer, initialState,
            applyMiddleware(thunk)
        );
    }

}

export default ConfigureStore;