import React, {FC, useEffect, useState} from "react";
import {Button, message, Table, Modal} from "antd";
import {checkComment, getComment} from "../../api/modules/comment";
import {timestampToTime} from "../../utils/utils";
import '../../static/css/comment.scss'
import marked from "marked";
import hljs from 'highlight.js'
import '../../components/mdEditor/preview.scss'
import {ExclamationCircleOutlined} from '@ant-design/icons'
const { confirm } = Modal;

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
        return hljs.highlightAuto(code).value;
    }
});

const Comment: FC = () => {
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataSource, setDataSource] = useState([])
    const [limit, setLimit] = useState(10)

    const getCommentListHandler = (page?: any, pageSize?: any) => {
        let params = {
            currentPage: page || currentPage,
            limit: pageSize || limit
        }
        getComment(params).then(res => {
            let result = res.data
            if (res.code === 200) {
                if (result.data.length > 0) {
                    setTotal(result.total)
                }
                setDataSource(result.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getCommentListHandler()
    }, [])

    const checkHandler = (record: any,isChecked: number) => {
        confirm({
            title: '你正在审核一条评论，请确认！',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                checkComment({
                    id: record.id,
                    isChecked: isChecked
                }).then(res => {
                    if(res.code === 200) {
                        getCommentListHandler()
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }
                    console.log(res)
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }
    const pageChange = (page: any, pageSize: any) => {
        setCurrentPage(page)
        setLimit(pageSize)
        getCommentListHandler(page, pageSize)
    }
    const columns = [
        {
            title: '消息id',
            dataIndex: 'id',
            key: 'id',
            width: 200,
        },
        {
            title: '评论位置',
            dataIndex: 'artTitle',
            key: 'artTitle',
            render: (artTitle: any) => {
                if (!artTitle) {
                    return '添加友链'
                } else {
                    return <span>《{artTitle}》</span>
                }
            }
        },
        {
            title: '评论时间',
            dataIndex: 'cdate',
            key: 'cdate',
            width: 200,
            render: (cdate: any) => {
                return timestampToTime(cdate)
            }
        },
        {
            title: '状态',
            dataIndex: 'isChecked',
            key: 'isChecked',
            width: 80,
            render: (isChecked: any) => {
                if (isChecked === 0) {
                    return <span style={{color: 'red'}}>待审核</span>
                } else if (isChecked === 1) {
                    return <span>已审核</span>
                }
            },
        },
        {
            title: '操作',
            width: 200,
            render: (row: any, record: any) => {
                return (
                    <div>
                        {record.isChecked === 0 ?
                            <Button type="primary" onClick={() => {
                                checkHandler(record,1)
                            }}>
                                通过
                            </Button> : <Button type="primary" onClick={() => {
                                checkHandler(record,0)
                            }} ghost>
                                不通过
                            </Button>}
                        {/*<Button type="primary" onClick={() => {*/}

                        {/*}} style={{marginLeft: '20px'}} danger>*/}
                        {/*    删除*/}
                        {/*</Button>*/}

                    </div>

                )
            }
        },
    ]
    const renderComment = (val: string) => {
        return marked(val).replace(/<a/g, '<a target="_blank"')
    }
    const expandElement = (content: any) => {
        return (
            <div className='expand-div'>
                {
                    content.to_uname ? <div className='comment-info'>
                        <div className='comment-user'>
                            <div className='nickname'>{content.from_uweb ? <a href={content.from_uweb}
                                                                              target={'_blank'}>{content.from_uname}</a> : content.from_uname}</div>
                            <div>回复</div>
                            <div className='nickname'>{content.to_web ? <a href={content.to_web}
                                                                           target={'_blank'}>{content.to_uname}</a> : content.to_uname}</div>
                            <div>说：</div>
                        </div>
                        <div className='comment-content' id={'r-md-preview'} dangerouslySetInnerHTML={{__html: renderComment(content.content)}}></div>
                    </div> : <div className='comment-info'>
                        <div className='comment-user'>
                            <div className='nickname'>{content.from_uweb ? <a href={content.from_uweb}
                                                                              target={'_blank'}>{content.from_uname}</a> : content.from_uname}</div>
                            <div>评论说：</div>
                        </div>
                        <div className='comment-content' id={'r-md-preview'}  dangerouslySetInnerHTML={{__html: renderComment(content.content)}}></div>
                    </div>
                }
            </div>
        )
    }
    return (
        <div className='wrapper-div'>
            <div className='module-title'>
                评论管理
            </div>
            <Table
                columns={columns}
                rowKey='id'
                pagination={
                    {
                        total: total,
                        onChange: pageChange,
                        current: currentPage
                    }
                }
                expandable={{
                    expandedRowRender: record => expandElement(record)
                }}
                dataSource={dataSource}
            />
        </div>
    )
}

export default Comment