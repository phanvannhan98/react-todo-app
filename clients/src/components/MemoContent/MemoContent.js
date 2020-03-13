import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as actions from '../../actions/app.actions'

export default (props) => {

    const [isEdit, setIsEdit] = useState(false)
    const [dateCreated, setDateCreated] = useState("")
    const [category, setCategory] = useState("")
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    const idMemoClicked = useSelector(state => state.idMemoClicked);
    const listMemo = props.listMemo;

    const dispatch = useDispatch();

    let memo = listMemo.find(value => value._id === idMemoClicked) || listMemo[0];

    if (!idMemoClicked || memo._id !== idMemoClicked) {
        dispatch(actions.actSetIdMemoClicked(memo._id))
    }

    useEffect(() => {
        setDateCreated(moment(memo.dateCreated).format("YYYY-MM-DD"))
        setCategory(memo.category._id)
        setName(memo.name)
        setContent(memo.content)
        setTitle(memo.title)
        // eslint-disable-next-line
    }, [idMemoClicked])

    let here = {
        ...memo,
        dateCreated: dateCreated,
        category: props.listCategory.find(v => v._id === category),
        name: name,
        content: content,
        title: title,
        dateEdited: new Date()
    }

    if (memo)
        return (
            <div className="primary-view__todo-info">
                <div className="action-area">
                    {
                        !props.isDeleted ?
                            <>
                                <button
                                    className="btn btn-edit"
                                    onClick={() => { setIsEdit(!isEdit) }}
                                    style={isEdit ? { backgroundColor: '#ffeb3b45' } : {}}
                                >
                                    <img src="./images/pen-solid.svg" alt="x" /> <span>{!isEdit ? 'Edit' : 'Cancel'}</span>
                                </button>
                                <button className="btn btn-save"
                                    onClick={isEdit ? () => { dispatch(actions.actUpdateMemoItemRequest(here)); setIsEdit(false) } : () => { }}
                                >
                                    <img src="./images/save-solid.svg" alt="x" /> <span>Save</span>
                                </button>
                                <button className="btn btn-clip"
                                    onClick={() => {
                                        let memo = listMemo.find(v => v._id === idMemoClicked);
                                        memo.isClip = !memo.isClip;
                                        dispatch(actions.actUpdateMemoItemRequest(memo))
                                    }}
                                >
                                    <img src="./images/paperclip-solid.svg" alt="x" /> <span>Clip</span>
                                </button>
                            </>
                            :
                            <button
                                className="btn btn-edit"
                                onClick={() => {
                                    let a = window.confirm("do you want to restore this post?")
                                    if (a) {
                                        let memo = listMemo.find(v => v._id === idMemoClicked);
                                        memo.dateDeleted = null;
                                        dispatch(actions.actUpdateMemoItemRequest(memo))
                                    }
                                }}
                                style={{ width: '100px' }}
                            >
                                <img src="./images/return.svg" alt="x" style={{ width: '16px' }} /> <span>Restore</span>
                            </button>

                    }

                    <div className="wrapper-btn-delete">
                        <button className="btn btn-delete" onClick={() => {
                            let memo = listMemo.find(v => v._id === idMemoClicked);

                            let str = memo.isClip ? "Do you want to delete this clip Post?" : "Do you want to delete this Post?";

                            let a = window.confirm(str)
                            if (a) {
                                if (memo.dateDeleted) {
                                    dispatch(actions.actDeleteOneMemoRequest(memo))
                                } else {
                                    memo.dateDeleted = new Date();
                                    memo.isClip = false;
                                    dispatch(actions.actUpdateMemoItemRequest(memo))
                                }
                            }
                        }}>
                            <img src="./images/trash-solid.svg" alt="x" /> <span>Delete</span>
                            </button>
                    </div>
                </div>

                <div className="todo-info-area">
                    <div className="wrapper-date-category">
                        <div className="wrapper-date-category__date">
                            <img src="./images/clock-regular.svg" alt="" />
                            {isEdit ? <input
                                type="date"
                                value={dateCreated}
                                style={{ fontSize: '14px', fontFamily: 'futura pt book' }}
                                onChange={(e) => { setDateCreated(e.target.value) }}
                            /> : <span>{moment(memo.dateCreated).format("YYYY/MM/DD")}</span>}
                        </div>
                        <div className="wrapper-date-category__category">
                            <img src="./images/tags-solid-1.svg" alt="" />
                            {isEdit ?
                                <select
                                    style={{
                                        height: '25px',
                                        minWidth: '150px',
                                        fontSize: '14px',
                                        borderColor: '#a9a9a9'
                                    }}
                                    value={category}
                                    onChange={(e) => { setCategory(e.target.value) }}
                                >
                                    {props.listCategory.map(v => (<option value={v._id} key={v._id}>{v.name}</option>))}
                                </select> :
                                <span>{memo.category.name}</span>
                            }
                        </div>
                    </div>
                    {
                        isEdit ?
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <input type="text" className="todo-info-area__title"
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        fontFamily: 'futura pt',
                                        borderBottom: '1px solid #999'
                                    }}
                                    placeholder="Title here..."
                                    value={title}
                                    onChange={e => { setTitle(e.target.value) }}
                                    required
                                />

                                <input type="text" className="todo-info-area__title"
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        fontFamily: 'futura pt',
                                        borderBottom: '1px solid #999'
                                    }}
                                    placeholder="Name here..."
                                    value={name}
                                    onChange={e => { setName(e.target.value) }}
                                    required
                                />
                            </div>
                            :
                            <h2 className="todo-info-area__title">{memo.name}</h2>
                    }
                    {
                        isEdit ?
                            <textarea className="todo-info-area__content" id="scroll-text"
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    padding: '20px',
                                    boxSizing: 'border-box',
                                    resize: "none"
                                }}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            >
                                {memo.content}
                            </textarea> :
                            <>
                                <p className="todo-info-area__content">
                                    {memo.content}
                                </p>
                                {
                                    memo.dateEdited ?
                                        <div className="edited-tooltip">
                                            <div>
                                                <span className="edited-tooltip__tooltip">{moment(memo.dateEdited).format('DD/MM/YYYY')}</span>
                                                <span className="edited-tooltip__bot-tooltip"></span>
                                                <span>( edited )</span>
                                            </div>
                                        </div> : ''
                                }
                            </>
                    }
                </div>

            </div>

        )
}
