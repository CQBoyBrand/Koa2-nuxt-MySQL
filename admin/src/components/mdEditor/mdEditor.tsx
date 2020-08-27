import React, {useEffect, useRef, useState, useImperativeHandle} from 'react';
import marked from "marked";
import hljs from 'highlight.js'
import './mdEditor.scss'
import './preview.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/fold/foldgutter.css'

const renderer = new marked.Renderer();
marked.setOptions({
    renderer: renderer,
    gfm: true,
    // tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code, lang, callback) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, code).value;
            } catch (__) {
            }
        }
        // return hljs.highlightAuto(code).value; // 这个方法内容稍微多一点会卡得要死。。。
    }
});
const Codemirror = require('codemirror')
require('codemirror/mode/meta.js');
require('codemirror/mode/go/go.js');
require('codemirror/mode/gfm/gfm.js');
require('codemirror/mode/vue/vue.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/lua/lua.js');
require('codemirror/mode/php/php.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/jsx/jsx.js');
require('codemirror/mode/sql/sql.js');
require('codemirror/mode/pug/pug.js');
require('codemirror/mode/lua/lua.js');
require('codemirror/mode/sass/sass.js');
require('codemirror/mode/http/http.js');
require('codemirror/mode/perl/perl.js');
require('codemirror/mode/ruby/ruby.js');
require('codemirror/mode/nginx/nginx.js');
require('codemirror/mode/shell/shell.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/stylus/stylus.js');
require('codemirror/mode/python/python.js');
require('codemirror/mode/haskell/haskell.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/javascript/javascript.js');

require('codemirror/addon/mode/overlay.js');
require('codemirror/addon/edit/closetag.js');
require('codemirror/addon/edit/continuelist.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/scroll/annotatescrollbar.js');
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/selection/mark-selection.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/matchesonscrollbar.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/match-highlighter.js');
require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/xml-fold.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/comment-fold.js');
require('codemirror/addon/fold/indent-fold.js');
require('codemirror/addon/fold/brace-fold.js');
require('codemirror/addon/fold/markdown-fold.js');

function MdEditor(props: any) {
    const inputRef = useRef(null) // 获取 输入框 dom
    const mdContainer = useRef(null) // 获取 md 容器 dom
    const fileUpload = useRef<HTMLInputElement>(null)  // 获取 上产文件的input dom
    const previewDom = useRef<HTMLInputElement>(null)  // 获取 预览 dom
    const [showUpload, setShowUpload] = useState(false) // 上传图片按钮处理
    const [fullscreen, setFullscreen] = useState(false) // 全屏
    const [mdEditor, setMdEditor] = useState()
    const [linkToNewPage, setLinkToNewPage] = useState(true)
    const [previewContent, setPreviewContent] = useState('') // 预览内容
    const [mdVal, setMdVal] = useState('') // 预览内容
    useEffect(() => {
            setMdEditor(Codemirror(inputRef.current, {

                mode: 'gfm',
// 行号
                lineNumbers: true,
                // 自动验证错误
                matchBrackets: true,
                // 是否换行
                lineWrapping: true,
                // 点击高亮正行
                styleActiveLine: true,
                // 配色
                theme: 'darcula',
                // 自动补全括号
                autoCloseBrackets: true,
                // 自动闭合标签
                autoCloseTags: true,
                // 自动高亮所有选中单词
                // styleSelectedText: true,
                // highlightSelectionMatches: { showToken: /w/, annotateScrollbar: true },
                // 展开折叠
                foldGutter: true,
                autofocus: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                // 回车键自动补全上一步格式
                extraKeys: {
                    Enter: 'newlineAndIndentContinueMarkdownList'
                },
            }))
        },
        [inputRef])

    useEffect(() => {
        if (mdEditor) {
            // 监听内容改变
            mdEditor.on('change', (cm: any) => {
                let inputVal = cm.getValue()
                if (linkToNewPage) {
                    setPreviewContent(marked(inputVal).replace(/<a/g, '<a target="_blank"'))
                } else {
                    setPreviewContent(marked(inputVal))
                }
                // setMdVal(inputVal)
                if (props && props.updateContent) {
                    props.updateContent(inputVal)
                }
            })

            // 编辑器滚动时触发
            mdEditor.on('scroll', (instance: any, from: number, to: number) => {
                let editScrollTop = instance.doc.scrollTop // 编辑器滚动条距顶部的距离
                let editScrollHeight = instance.doc.height // 编辑器滚动区域总高度
                // @ts-ignore
                let previewDomHeight = previewDom.current.scrollHeight // 预览区总高度
                // @ts-ignore
                previewDom.current.scrollTop = (editScrollTop / editScrollHeight) * previewDomHeight
            })
        }
    }, [mdEditor, linkToNewPage])
    // useEffect(() => {
    //     if (props && props.updateContent) {
    //         props.updateContent(mdVal)
    //     }
    // }, [mdVal])
    useEffect(() => {
        Codemirror.commands.undo = function () {
            undo()
        }
        Codemirror.commands.redo = function () {
            redo()
        }
    }, [mdEditor])

    useEffect(() => {
        if (props && typeof props.imgUpload === 'function') {
            setShowUpload(true)
        } else {
            setShowUpload(false)
        }

        if (props && props.defaultMd) {
            mdEditor.setValue(props.defaultMd)
        }


    }, [props, mdEditor])


    // 上传图片-上传
    const fileChange = (e: any) => {
        let file = e.target.files[0]
        if (showUpload) {
            props.imgUpload(file)
        } else {
            insertImage('请自定义配置上传图片的方法')
        }
    }
    // 上传图片-点击事件
    const uploadImage = () => {
        if (fileUpload && fileUpload.current) {
            fileUpload.current.click()
        }
    }

    // 插入图片链接
    const insertImage = (url?: string) => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        let hasUrl = `![图片描述](${url})`
        let insertTxt = url ? hasUrl : '![]()'
        mdEditor.replaceSelection(insertTxt, position) // 在光标位置插入数据
        let posCh = url ? hasUrl.length : 4
        position.ch += posCh
        mdEditor.focus()
        mdEditor.setCursor(position) // 设置光标位置
    }
    // 插入代码
    const insertCode = async () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        let insertTxt = '```\n\n```'
        mdEditor.replaceSelection(insertTxt, position) // 在光标位置插入数据
        position.ch += 3
        mdEditor.focus()
        mdEditor.setCursor(position) // 设置光标位置
    }
    // 插入行内代码
    const insertLineCode = () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        let insertTxt = '``'
        mdEditor.replaceSelection(insertTxt, position) // 在光标位置插入数据
        position.ch += 1
        mdEditor.focus()
        mdEditor.setCursor(position) // 设置光标位置
    }
    // 插入链接
    const insertLink = () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        let insertTxt = `[Link]( 'Link title')`
        mdEditor.replaceSelection(insertTxt, position) // 在光标位置插入数据
        position.ch += 7
        mdEditor.focus()
        mdEditor.setCursor(position) // 设置光标位置
    }
    // 删除
    const insertDel = () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        let insertTxt = '~~~~'
        mdEditor.replaceSelection(insertTxt, position) // 在光标位置插入数据
        position.ch += 2
        mdEditor.focus()
        mdEditor.setCursor(position) // 设置光标位置
    }
    // 插入表格
    const insertTable = () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        let insertTxt = `\n|     |\n| --- |\n|     |\n`
        mdEditor.replaceSelection(insertTxt, position) // 在光标位置插入数据
        position.ch += 3
        mdEditor.focus()
        mdEditor.setCursor(position) // 设置光标位置
    }

    // 回退
    const undo = () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        console.log(position)
        mdEditor.undo()
        mdEditor.focus()
        mdEditor.setCursor(position)
    }
    // 撤销
    const redo = () => {
        let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
        mdEditor.redo()
        console.log(position)
        mdEditor.focus()
        mdEditor.setCursor(position)
    }

    // 全屏-开启与退出
    const handleFullScreen = () => {
        let element = mdContainer.current as any;
        let doc = document as any;
        // 判断是否已经是全屏
        // 如果是全屏，退出
        if (fullscreen) {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
        } else {    // 否则，进入全屏
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        setFullscreen(!fullscreen)
    }

    window.onresize = function () {
        let doc = document as any;
        let isFull = !!(doc.webkitIsFullScreen || doc.mozFullScreen ||
            doc.msFullscreenElement || doc.fullscreenElement
        );//!document.webkitIsFullScreen都为true。因此用!!
        if (isFull === false) {
            setFullscreen(false)
        }
    }

    // 复制DOM
    const handleCopyDom = () => {
        let doc = document as any
        let div = previewDom.current as any
        if (doc.body.createTextRange) {
            let range = doc.body.createTextRange();
            range.moveToElementText(div);
            range.select();
        } else if (window.getSelection) {
            let selection = window.getSelection() as any;
            let range = doc.createRange();
            range.selectNodeContents(div);
            selection.removeAllRanges();
            selection.addRange(range);
            /*if(selection.setBaseAndExtent){
                selection.setBaseAndExtent(text, 0, text, 1);
            }*/
        } else {
            console.warn("none");
        }
        doc.execCommand("Copy"); // 执行浏览器复制命令

        alert("已复制好，去不支持 Markdown 语法的其他平台粘贴试试。");
    }

    // 暴露给父组件使用的方法
    useImperativeHandle(props.cRef, () => ({
        addImg: (params: string) => {
            // 父组件向该组件 markdown 中插入图片链接
            insertImage(params)
        },
        getInputData() {
            // 获取该组件输入的数据，返回给父组件
            // 方便父组件拿到数据，和其他数据一起进行存储
            return {
                md: mdEditor.getValue(), // md 格式
                mdToHtml: marked(mdEditor.getValue()) // md 专成 html 格式后的数据
            }
        }
    }))
    return (
        <div className="react-md-container" ref={mdContainer}>
            <div className='react-md-editor-toolbar'>
                <ul className='tool-bar-lists-left'>
                    <li onClick={insertCode}>代码</li>
                    <li onClick={insertLineCode}>行内代码</li>
                    <li onClick={insertLink}>链接</li>
                    <li onClick={uploadImage}>
                        <input onChange={(e) => fileChange(e)} ref={fileUpload} type="file" style={{display: "none"}}/>
                        上传图片
                    </li>

                    <li onClick={() => insertImage()}>图片链接</li>
                    <li onClick={() => insertDel()}>删除</li>
                    <li onClick={() => insertTable()}>表格</li>
                    <li onClick={undo}>回退</li>
                    <li onClick={redo}>撤销</li>
                </ul>
                <ul className='tool-bar-lists-right'>
                    <li onClick={() => handleFullScreen()}>{fullscreen ? '退出全屏' : '全屏'}</li>
                    <li onClick={() => handleCopyDom()}>复制DOM</li>
                    <li className='tool-bar-setting'>
                        <div>设置</div>
                        <div className='setting-panel'>
                            <div className='panelItem'>
                                <input id='linkCheck' checked={linkToNewPage} onChange={(e) => {
                                    setLinkToNewPage(e.target.checked)
                                }} type="checkbox"/>
                                <label htmlFor="linkCheck">
                                    链接打开新页面
                                </label>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='react-md-editor-main'>
                <div className='react-md-editor-input'>
                    <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                        <div style={{height: '100%'}} ref={inputRef}></div>
                    </div>
                </div>
                <div className='react-md-editor-preview'>
                    <div className='preview-box' ref={previewDom}>
                        <div id='r-md-preview' style={{minHeight: '100%', width: '100%'}}
                             dangerouslySetInnerHTML={{__html: previewContent}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MdEditor;
