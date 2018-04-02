module.exports = {
    files: {
        javascripts: {joinTo: 'app.js'},
        stylesheets: {joinTo: 'app.css'},
    },
    plugins: {
        babel: {presets: ['latest', 'react']}
    }
}