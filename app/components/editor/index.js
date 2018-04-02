const {Component} = require('react')

class Editor extends Component {
    componentDidMount() {
        this.renderEditor()
    }

    componentDidUpdate() {
        this.renderEditor()
    }

    renderEditor() {
        const {theme, mode, content, handleChange} = this.props
        const editor = ace.edit(this.element, {
            theme: `ace/theme/${theme}`,
            mode: `ace/mode/${mode}`
        })
        editor.setValue(content)
        editor.on('change', () => {
            const content = editor.getValue()
            handleChange(content)
        })
        this.editor = editor
    }

    shouldComponentUpdate({content}) {
        return content !== this.editor.getValue()
    }

    render() {
        const {height, fontSize, button, buttonClass, buttonText, buttonAction} = this.props
        return (
            <div className='editor' style={{height, fontSize}} ref={e => this.element = e}></div>
        )
    }
}

Editor.defaultProps = {
    height: 640,
    fontSize: '1em',
    theme: 'monokai',
    mode: 'javascript',
    content: ''
}

module.exports = Editor