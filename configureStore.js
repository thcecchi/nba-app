import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import combineActionsMiddleware from 'redux-combine-actions';
import rootReducer from './reducers/reducers'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      combineActionsMiddleware
    )
  )
}
