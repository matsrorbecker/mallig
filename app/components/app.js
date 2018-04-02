const {Component} = require('react')
const {connect} = require('react-redux')
const Editor = require('./editor')
const saveData = require('../actions/savedata')
const saveTemplate = require('../actions/savetemplate')
const saveHtml = require('../actions/savehtml')
const pug = require('jade')

class App extends Component {
    constructor(props) {
        super(props)
        this.openFileInput = this.openFileInput.bind(this)
        this.readFile = this.readFile.bind(this)
        this.renderHtml = this.renderHtml.bind(this)
    }

    openFileInput() {
        this.fileInput.click()
    }

    readFile() {
        const {dispatch} = this.props
        const file = this.fileInput.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            dispatch(saveData(reader.result))
        }
        reader.readAsText(file)
    }

    renderHtml() {
        const {data, template, dispatch} = this.props
        const html = pug.render(template, JSON.parse(data))
        dispatch(saveHtml(html))
    }

    render() {
        const {data, template, html, dispatch} = this.props
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md'>
                        <h4>Data</h4>
                        <Editor content={data} handleChange={(content) => dispatch(saveData(content))} />
                        <input type='file' ref={e => this.fileInput = e} style={{display: 'none'}} onChange={this.readFile} />
                        <button type='button' className='btn btn-secondary' onClick={this.openFileInput}>Read from file</button>
                        <button type='button' className='btn btn-danger' onClick={() => dispatch(saveData(''))} >Clear</button>
                    </div>
                    <div className='col-md'>
                        <h4>Template</h4>
                        <Editor mode='jade' content={template} handleChange={(content) => dispatch(saveTemplate(content))} />
                        <button type='button' className='btn btn-secondary' onClick={this.renderHtml}>Render HTML</button>
                        <button type='button' className='btn btn-danger' onClick={() => dispatch(saveTemplate(''))} >Clear</button>
                    </div>
                    <div className='col-md'>
                        <h4>Output</h4>
                        <div dangerouslySetInnerHTML={{__html: html}} ></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({data, template, html}) => ({data, template, html})
module.exports = connect(mapStateToProps)(App)