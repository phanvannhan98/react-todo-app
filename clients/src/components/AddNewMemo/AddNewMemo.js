import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as actions from '../../actions/app.actions'

export default (props) => {
    const [dateCreated, setDateCreated] = useState(new Date())
    const [category, setCategory] = useState(props.listCategory[0]._id)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    const dispatch = useDispatch();

    const onAdd = (event) => {
        event.preventDefault();
        let data = {
            dateCreated,
            category: props.listCategory.find(v => v._id === category),
            name,
            content,
            title
        }
        if (data.name && data.content && data.title) {
            dispatch(actions.actAddNewMemoRequest(data))
            setTimeout(() => {
                props.setIsCreateNew(false)
            }, 400);
        } else {
            alert('Please enter full information!')
        }
    }

    return (
        <div className="primary-view__todo-info">
            <div className="action-area">
                <button className="btn btn-edit">
                    <img src="./images/pen-solid.svg" alt="x" /> Edit
                </button>
                <button className="btn btn-save">
                    <img src="./images/save-solid.svg" alt="x" /> Save
                </button>
                <button className="btn btn-clip">
                    <img src="./images/paperclip-solid.svg" alt="x" /> Clip
                </button>
                <div className="wrapper-btn-delete">
                    <button className="btn btn-delete">
                        <img src="./images/trash-solid.svg" alt="x" /> Delete
                    </button>
                </div>
            </div>

            <div className="todo-info-area">
                <form onSubmit={e => { e.preventDefault(); onAdd() }}>
                    <div className="wrapper-date-category">
                        <div className="wrapper-date-category__date">
                            <img src="./images/clock-regular.svg" alt="x" />
                            <input
                                type="date"
                                style={{ fontSize: '14px', fontFamily: 'futura pt book' }}
                                value={moment(dateCreated).format('YYYY-MM-DD')}
                                onChange={e => { setDateCreated(e.target.value) }}
                            />
                        </div>
                        <div className="wrapper-date-category__category">
                            <img src="./images/tags-solid-1.svg" alt="x" />
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
                            </select>
                        </div>
                    </div>

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

                    <textarea className="todo-info-area__content" id="scroll-text"
                        style={{
                            width: '100%',
                            height: '400px',
                            padding: '20px',
                            boxSizing: 'border-box',
                            resize: "none",
                            letterSpacing: '0.6px'
                        }}
                        placeholder="Something..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    >

                    </textarea>

                    <div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
                        <button className="btn btn-add" onClick={onAdd}>
                            <img src="./images/plus-solid.svg" alt="x" /> Add
                        </button>
                        <button className="btn btn-add" onClick={() => props.setIsCreateNew(false)}>
                            <img style={{ width: '16px' }} src="./images/minus.svg" alt="x" />Cancel
                        </button>
                    </div>
                </form>
            </div>

        </div>

    )

}
