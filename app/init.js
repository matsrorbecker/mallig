const React = window.React = require('react')
const {render} = require('react-dom')
const {createStore} = require('redux')
const {Provider} = require('react-redux')

const App = require('./components/app')
const rootReducer = require('./reducers/rootreducer')
const store = window.store = createStore(rootReducer)

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector('#app')
    )
})