import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as Actions from '../../actions/app.actions'

export default (props) => {

    const [dateCreated, setDateCreated] = useState("")
    const [category, setCategory] = useState("")
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const idMemoClicked = useSelector(state => state.idMemoClicked);
    const listMemo = props.listMemo;

    const dispatch = useDispatch();

    let memo = listMemo.find(value => value._id === idMemoClicked) || listMemo[0];

    if (!idMemoClicked || memo._id !== idMemoClicked) {
        dispatch(Actions.actSetIdMemoClicked(memo._id))
    }

    useEffect(() => {
        setDateCreated(moment(memo.dateCreated).format("YYYY-MM-DD"))
        setCategory(memo.category._id)
        setName(memo.name)
        setContent(memo.content)
    }, [props.isEdit])

    if (memo)
        return (
            <div className="todo-info-area">
                <div className="wrapper-date-category">
                    <div className="wrapper-date-category__date">
                        <img src="./images/clock-regular.svg" alt="" />
                        {props.isEdit ? <input
                            type="date"
                            value={dateCreated}
                            style={{ fontSize: '14px', fontFamily: 'futura pt book' }}
                            onChange={(e) => { setDateCreated(e.target.value) }}
                        /> : <span>{moment(memo.dateCreated).format("YYYY/MM/DD")}</span>}
                    </div>
                    <div className="wrapper-date-category__category">
                        <img src="./images/tags-solid-1.svg" alt="" />
                        {props.isEdit ?
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
                    props.isEdit ?
                        <input type="text" className="todo-info-area__title"
                            style={{
                                border: 'none',
                                outline: 'none',
                                fontFamily: 'futura pt',
                                borderBottom: '1px solid #999'
                            }}
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                        />
                        :
                        <h2 className="todo-info-area__title">{memo.name}</h2>
                }
                {
                    props.isEdit ?
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
                        <p className="todo-info-area__content">
                            {memo.content}
                        </p>
                }
            </div>
        )

    return ''
}
