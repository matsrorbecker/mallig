const defaultData = `{
    "foo": true,
    "bar": "abc",
    "baz": [
        123
    ]
}`

const defaultTemplate = `if (foo)
    h1 Secret password
    p #{bar}#{baz[0]}`

const initialState = {
    data: defaultData,
    template: defaultTemplate,
    html: ''
}

module.exports = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_DATA':
            return Object.assign({}, state, {
                data: action.data
            })
        case 'SAVE_TEMPLATE':
            return Object.assign({}, state, {
                template: action.template
            })
        case 'SAVE_HTML':
            return Object.assign({}, state, {
                html: action.html
            })
        default:
            return state
    }
}