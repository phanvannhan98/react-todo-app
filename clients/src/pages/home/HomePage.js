import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SemipolarLoading } from 'react-loadingg';
import Category from '../../components/Category/Category';
import MemoList from '../../components/MemoList/MemoList';
import MemoContent from '../../components/MemoContent/MemoContent';
import * as actions from '../../actions/app.actions';
import './main.scss';
import { Link, Redirect } from 'react-router-dom';
import CallAPI from '../../utils/apiCaller';

export default () => {
    const [load, setLoad] = useState(true);
    const [isClip, setIsClip] = useState(false);
    const [isSortDate, setIsSortDate] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isEdit, setIsEdit] = useState(false)

    const [isRedirect, setIsRedirect] = useState('')

    const dispatch = useDispatch()

    const listCategory = useSelector(state => state.category)
    let listMemo = useSelector(state => state.memo)
    const idMemoClicked = useSelector(state => state.idMemoClicked)
    const idCategoryClicked = useSelector(state => state.idCategoryClicked)

    useEffect(() => {

        CallAPI('/api/login/checktoken', 'POST').then(doc => {
            setIsRedirect(!doc.data)
            if(doc.data){
                dispatch(actions.actGetAllMemoRequest())
                dispatch(actions.actGetAllCategoryRequest())
                dispatch(actions.actSetIdCategoryClicked(''))
                dispatch(actions.actSetIdMemoClicked(''))
                setTimeout(() => {
                    setLoad(false)
                }, 1500);
            }
        })

    }, [])

    if (listMemo.length && load) {
        setTimeout(() => {
            setLoad(false)
        }, 300);
    }

    let numAllNote = useSelector(state => state.memo).filter(v => !v.dateDeleted)

    listMemo = isDeleted ? listMemo.filter(value => value.dateDeleted) : listMemo.filter(value => !value.dateDeleted)
    if (listMemo.length && idCategoryClicked) {
        listMemo = listMemo.filter(value => value.category._id === idCategoryClicked)
    }

    listMemo = isClip ? listMemo.filter(value => value.isClip) : listMemo
    isSortDate ? listMemo.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()) :
        listMemo.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime())

    if (isSearch) {
        listMemo = numAllNote.filter(v => v.name.toLowerCase().includes(searchTxt.toLowerCase()))
    }


    if (isRedirect) {
        return <Redirect to='/login' />
    }

    return (
        <>
            {load ? <><div style={{ background: 'rgb(195, 66, 191)', opacity: 0.3, position: 'absolute', width: '100%', height: '100%' }}></div><SemipolarLoading color="red" speed="1" size="large" /></> : null}
            <div className="wrapper" style={load ? { opacity: 1 } : {}}>
                <div className="sidebar">
                    <Link to="/login" onClick={(e) => {
                    }} className="create-new-btn" href="/"><img src="/images/plus-solid.svg" alt="x" /><span>Create New</span></Link>
                    <ul>
                        <li
                            className={idCategoryClicked || isClip || isDeleted || isSearch ? "siderbar__li-item" : "siderbar__li-item activeCategory"}
                            onClick={(e) => {
                                dispatch(actions.actSetIdCategoryClicked(''))
                                dispatch(actions.actSetIdMemoClicked(''))
                                setIsClip(false)
                                setIsDeleted(false)
                                setIsSearch(false)
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
                            <Category listCategory={listCategory} isClip={isClip} isDeleted={isDeleted} setIsSearch={setIsSearch} />
                        </li>
                        <li
                            className={isClip ? "siderbar__li-item clip activeCategory" : "siderbar__li-item clip"}
                            onClick={e => { setIsClip(!isClip) }}
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
                                    onClick={() => { setIsDeleted(!isDeleted); setIsClip(false) }}
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
                        <form onSubmit={(e) => { e.preventDefault(); setIsSearch(true) }}>
                            <div className="primary-view__list-todo__search">
                                <div className="primary-view__list-todo__search__input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="キーワードを入力"
                                        onChange={e => { setSearchTxt(e.currentTarget.value); setIsSearch(false) }}
                                    />
                                </div>
                                <div className="primary-view__list-todo__search__img-wrapper"
                                    onClick={() => {
                                        setIsSearch(true); 
                                        dispatch(actions.actSetIdCategoryClicked('')); 
                                        setIsClip(false)
                                        setIsDeleted(false)
                                    }}
                                >
                                    <img src="./images/search-solid.svg" alt="x" />
                                </div>
                            </div>
                        </form>
                        <div className="primary-view__list-todo__sort-title">
                            <h2 className="primary-view__list-todo__sort-title__title">Title</h2>
                            <div className="primary-view__list-todo__sort-title__wrapper-icon-sort"
                                onClick={() => setIsSortDate(!isSortDate)}
                            >
                                <img src={!isSortDate ? "./images/sort-amount-up-alt-solid.svg" : "./images/sort-amount-down-solid.svg"} alt="x" />
                            </div>
                        </div>
                        {listMemo.length ? <MemoList listMemo={listMemo} /> : ''}
                    </div>
                    <div className="primary-view__todo-info">
                        <div className="action-area">
                            <button 
                                className="btn btn-edit"
                                onClick={() => {setIsEdit(!isEdit)}}
                            >
                                <img src="./images/pen-solid.svg" alt="x" /> Edit
                            </button>
                            <button className="btn btn-save">
                                <img src="./images/save-solid.svg" alt="x" /> Save
                            </button>
                            <button className="btn btn-clip"
                                onClick={() => {
                                    let memo = listMemo.find(v => v._id === idMemoClicked);
                                    memo.isClip = !memo.isClip;
                                    dispatch(actions.actUpdateMemoItemRequest(memo))
                                }}
                            >
                                <img src="./images/paperclip-solid.svg" alt="x" /> Clip
                            </button>
                            <div className="wrapper-btn-delete">
                                <button className="btn btn-delete" onClick={() => {
                                    let memo = listMemo.find(v => v._id === idMemoClicked);
                                    memo.dateDeleted = memo.dateDeleted ? memo.dateDeleted : new Date();
                                    dispatch(actions.actUpdateMemoItemRequest(memo))
                                }}>
                                    <img src="./images/trash-solid.svg" alt="x" /> Delete
                            </button>
                            </div>
                        </div>
                        {listMemo.length && listCategory.length ? <MemoContent listMemo={listMemo} listCategory={listCategory} isEdit={isEdit}/> : ''}
                    </div>
                </div>
            </div>
        </>

    )

}
