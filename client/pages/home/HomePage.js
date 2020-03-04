import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SemipolarLoading } from 'react-loadingg';
import axios from 'axios';
import Category from '../../components/Category/Category';
import MemoList from '../../components/MemoList/MemoList';
import MemoContent from '../../components/MemoContent/MemoContent';
import * as actions from '../../actions/app.actions';
import './main.scss';
import {Redirect, Link} from 'react-router-dom'

export default () => {
    const [load, setLoad] = useState(true);
    const [isClip, setIsClip] = useState(false);
    const [isSortDate, setIsSortDate] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const dispacth = useDispatch()

    const getAllCategory = useCallback(
        () => dispacth(actions.actGetAllCategoryRequest()),
        [dispacth]
    )

    const getAllMemo = useCallback(
        () => dispacth(actions.actGetAllMemoRequest()),
        [dispacth]
    )

    const listCategory = useSelector(state => state.category)
    let listMemo = useSelector(state => state.memo)
    const idMemoClicked = useSelector(state => state.idMemoClicked)
    const idCategoryClicked = useSelector(state => state.idCategoryClicked)

    useEffect(() => {
        getAllMemo()
        getAllCategory()
    }, [])

    if (listMemo.length && load) {
        setTimeout(() => {
            setLoad(false)
        }, 300);
    }

    let numAllNote = useSelector(state => state.memo).filter(v => !v.dateDeleted)
    console.log(numAllNote)

    listMemo = isDeleted ? listMemo.filter(value => value.dateDeleted) : listMemo.filter(value => !value.dateDeleted)
    if (listMemo.length && idCategoryClicked) {
        listMemo = listMemo.filter(value => value.category._id === idCategoryClicked)
    }

    listMemo = isClip ? listMemo.filter(value => value.isClip) : listMemo
    isSortDate ? listMemo.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()) :
    listMemo.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime())

    return (
        <>
            {/* <Redirect to="/login"/> */}
            {load ? <><div style={{ background: 'rgb(195, 66, 191)', opacity: 0.3, position: 'absolute', width: '100%', height: '100%' }}></div><SemipolarLoading color="red" speed="1" size="large" /></> : null}
            <div className="wrapper" style={load ? { opacity: 1 } : {}}>
                <div className="sidebar">
                    <Link to="/login" onClick={(e) => {
                        // e.preventDefault();
                        
                        // dispacth(actions.actUpdateMemoItem(a))
                        // getAllMemo()
                    }} className="create-new-btn" href="/"><img src="/images/plus-solid.svg" alt="x" /><span>Create New</span></Link>
                    <ul>
                        <li
                            className={idCategoryClicked || isClip || isDeleted ? "siderbar__li-item" : "siderbar__li-item activeCategory"}
                            onClick={(e) => {
                                dispacth(actions.actSetIdCategoryClicked(''))
                                dispacth(actions.actSetIdMemoClicked(''))
                                setIsClip(false)
                                setIsDeleted(false)
                            }}
                        >
                            <div className="icon-title" >
                                <img src="/images/sticky-note-solid.svg" alt="x" />
                                <span>All Notes</span>
                            </div>
                        <span className="post-number">{numAllNote.length}</span>
                        </li>
                        <li>
                            <a className="category-btn" href="/" onClick={(e) => {
                                e.preventDefault();
                                var z = document.getElementsByClassName('list-category')[0];

                                z.style.maxHeight = z.style.maxHeight ? null : z.scrollHeight + "px";
                                e.currentTarget.classList.toggle('active')
                            }}>
                                <div className="icon-title">
                                    <img src="/images/tags-solid.svg" alt="x" />
                                    <span>Category</span>
                                </div>
                            </a>
                            <Category listCategory={listCategory} isClip={isClip} isDeleted={isDeleted}/>
                        </li>
                        <li
                            className={isClip ? "siderbar__li-item clip activeCategory" : "siderbar__li-item clip"}
                            onClick={e => {setIsClip(!isClip)}}
                        >
                            <div className="icon-title">
                                <img src="/images/paperclip-solid-1.svg" alt="x" />
                                <span>Clip</span>
                            </div>
                            <span className="post-number">{listMemo.filter(v => v.isClip).length}</span>
                        </li>
                        <li>
                            <div className="wrapper-deleted">
                                <div className={`wrapper-deleted__btn-deleted siderbar__li-item ${isDeleted ? 'activeCategory' : ''} `}
                                    onClick={() => {setIsDeleted(!isDeleted); setIsClip(false)}}
                                >
                                    <img src="./images/trash-solid.svg" alt="x" />
                                    <span>Delete</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="primary-view">
                    <div className="primary-view__list-todo">
                        <div className="primary-view__list-todo__search">
                            <div className="primary-view__list-todo__search__input-wrapper">
                                <input type="text" placeholder="キーワードを入力" />
                            </div>
                            <div className="primary-view__list-todo__search__img-wrapper">
                                <img src="./images/search-solid.svg" alt="" />
                            </div>
                        </div>
                        <div className="primary-view__list-todo__sort-title">
                            <h2 className="primary-view__list-todo__sort-title__title">Title</h2>
                            <div className="primary-view__list-todo__sort-title__wrapper-icon-sort"
                                onClick={() => setIsSortDate(!isSortDate)}
                            >
                                <img src={!isSortDate ? "./images/sort-amount-up-alt-solid.svg" : "./images/sort-amount-down-solid.svg"} alt="" />
                            </div>
                        </div>
                        <MemoList listMemo={listMemo} />
                    </div>
                    <div className="primary-view__todo-info">
                        <div className="action-area">
                            <button className="btn btn-edit">
                                <img src="./images/pen-solid.svg" alt="" /> Edit
                            </button>
                            <button className="btn btn-save">
                                <img src="./images/save-solid.svg" alt="" /> Save
                            </button>
                            <button className="btn btn-clip"
                                onClick={() => {
                                    let memo = listMemo.find(v => v._id === idMemoClicked);
                                    memo.isClip = !memo.isClip;
                                    dispacth(actions.actUpdateMemoItemRequest(memo))
                                }}
                            >
                                <img src="./images/paperclip-solid.svg" alt="" /> Clip
                            </button>
                            <div className="wrapper-btn-delete">
                                <button className="btn btn-delete" onClick={() => {
                                    let memo = listMemo.find(v => v._id === idMemoClicked);
                                    memo.dateDeleted = memo.dateDeleted ? memo.dateDeleted : new Date();
                                    dispacth(actions.actUpdateMemoItemRequest(memo))
                                }}>
                                    <img src="./images/trash-solid.svg" alt="" /> Delete
                            </button>
                            </div>
                        </div>
                        <MemoContent listMemo={listMemo} />
                    </div>
                </div>
            </div>
        </>
    
    )

}
