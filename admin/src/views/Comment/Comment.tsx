import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Button, message, Table, Modal, Tabs} from "antd";
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
    const [defaultTab, setDefaultTab] = useState("0")
    const [currentPage, setCurrentPage] = useState(1)
    const [dataSource, setDataSource] = useState([])
    const [limit, setLimit] = useState(10)

    const getCommentListHandler = () => {
        let params = {
            currentPage: currentPage,
            limit: limit,
            type: Number(defaultTab)
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
    };
    useEffect(() => {
        getCommentListHandler()
    }, [currentPage, limit, defaultTab])

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
    }
    const columns = useMemo(() => {
        const list =  [
            {
                title: '消息id',
                dataIndex: 'id',
                key: 'id',
                width: 100,
            },
            {
                title: '评论位置',
                dataIndex: 'artTitle',
                key: 'artTitle',
                width: 200,
                render: (artTitle: any) => {
                    if (!artTitle) {
                        return '添加友链'
                    } else {
                        return <span>《{artTitle}》</span>
                    }
                }
            },
            {
                title: '内容',
                // width: 300,
                render: (v: any, r: any) => {
                    return (
                        <div>
                            {
                                r.to_uname ? <div className='comment-info'>
                                    <div className='comment-user'>
                                        <div className='nickname'>{r.from_uweb ? <a href={r.from_uweb}
                                                                                          target={'_blank'}>{r.from_uname}</a> : r.from_uname}</div>
                                        <div>回复</div>
                                        <div className='nickname'>{r.to_web ? <a href={r.to_web}
                                                                                       target={'_blank'}>{r.to_uname}</a> : r.to_uname}</div>
                                        <div>说：</div>
                                    </div>
                                    <div className='comment-content' id={'r-md-preview'} dangerouslySetInnerHTML={{__html: renderComment(r.content)}}></div>
                                </div> : <div className='comment-info'>
                                    <div className='comment-user'>
                                        <div className='nickname'>{r.from_uweb ? <a href={r.from_uweb}
                                                                                          target={'_blank'}>{r.from_uname}</a> : r.from_uname}</div>
                                        <div>说：</div>
                                    </div>
                                    <div className='comment-content' id={'r-md-preview'}  dangerouslySetInnerHTML={{__html: renderComment(r.content)}}></div>
                                </div>
                            }
                        </div>
                    );
                }
            },
            {
                title: '评论时间',
                dataIndex: 'cdate',
                key: 'cdate',
                width: 120,
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
                width: 100,
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
        return list;
    }, [dataSource, defaultTab])
    const renderComment = (val: string) => {
        return marked(val).replace(/<a/g, '<a target="_blank"')
    }
    const tabChangeHandler = (tabKey: any) => {
        setDefaultTab(tabKey);
        setCurrentPage(1);
    };
    return (
        <div className='wrapper-div'>
            <div className='module-title'>
                评论管理
            </div>
            <div>
                <Tabs defaultActiveKey={defaultTab} onChange={tabChangeHandler}>
                    <Tabs.TabPane tab="待处理" key="0" />
                    <Tabs.TabPane tab="已处理" key="1" />
                </Tabs>
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
                dataSource={dataSource}
            />
        </div>
    )
}

export default Comment