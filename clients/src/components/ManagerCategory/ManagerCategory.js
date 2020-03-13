import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/app.actions';

export default function ManagerCategory(props) {

    const [categoryNew, setCategoryNew] = useState('');
    const [categoryEdit, setCategoryEdit] = useState('');
    const [errorAddCate, setErrorAddCate] = useState(false);


    const listCategory = useSelector(state => state.category)
    const listMemo = useSelector(state => state.memo)
    const dispatch = useDispatch()

    const { setIsAddNewCategory, setLoad } = props;

    const onClick = () => {
        setLoad(true)
        var a = listCategory.find(v => v.name === categoryNew);
        if (!a && categoryNew.length) {
            if (categoryNew.length < 5 || categoryNew.length > 15) {
                categoryNew.length < 5 ? setErrorAddCate('Name is too short!') : setErrorAddCate('Name is too long!')
            } else {
                if (categoryEdit) {
                    const cate = { ...categoryEdit, name: categoryNew }
                    dispatch(actions.actUpdateCategoryRequest(cate)); setCategoryNew('')
                } else {
                    dispatch(actions.actAddNewCategoryRequest(categoryNew))
                }
                setCategoryEdit('')
            }

        } else if (categoryNew.length === 0) {
            setErrorAddCate('Please enter name of Category!')
        } else {
            setErrorAddCate('Name is exist!')
        }
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-wrapper__content">
                <div className="modal-wrapper__content__close" onClick={(e) => {
                    setIsAddNewCategory(false)
                }}>
                    <img src="./images/close.svg" alt="x" />
                </div>
                <div>Manager Category</div>
                <div className="modal-wrapper__content__group">
                    <label className="modal-wrapper__content__group__title">Name</label>
                    <div className="modal-wrapper__content__group__content">
                        <div className="border-img">
                            <img src="/images/plus-solid.svg" alt="x" />
                        </div>
                        <input type="text" value={categoryNew}
                            onChange={e => { setCategoryNew(e.target.value); setErrorAddCate('') }}
                        />
                        {/* '#385d83' */}
                        <button className={categoryEdit ? "btn-cate btn-edit-cate" : "btn-cate btn-add-cate"} onClick={onClick}>
                            {categoryEdit ? 'Save' : 'Add'}
                        </button>
                        {
                            categoryEdit ? <button className="btn-cate btn-cancel-cate" onClick={() => { setCategoryEdit(''); setCategoryNew('') }}>Cancel</button> : ''
                        }
                    </div>
                </div>

                <div className="error-cate" style={errorAddCate ? { opacity: 1 } : { opacity: 0 }}>{errorAddCate ? errorAddCate : 'aaaaaaaaaaa'}</div>

                {
                    listCategory.length ?
                        (<ul className="data-category">
                            <li>
                                <div className="cate-wrraper-name">
                                    Name
                                        </div>
                                <div className="cate-action">
                                    Action
                                        </div>
                            </li>
                            <div className="data-category__wrapper-data">
                                {listCategory.map(v => (
                                    <li key={v._id}>
                                        <div className="cate-wrraper-name">
                                            <div className="cate-wrraper-name__name">{v.name}</div>
                                        </div>
                                        <div className="cate-action">
                                            <button className="btn-cate btn-delete-cate"
                                                onClick={() => {
                                                    let checkExist = listMemo.filter(m => m.category._id === v._id);
                                                    if (checkExist.length && checkExist.find(m => !m.dateDeleted)) {
                                                        setErrorAddCate('This category cannot be deleted with an existing post!')
                                                    } else {
                                                        dispatch(actions.actDeleteOneCategoryRequest(v._id))
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn-cate btn-edit-cate"
                                                onClick={() => { setCategoryEdit(v); setCategoryNew(v.name) }}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </ul>)
                        :
                        ''
                }
            </div>
        </div>
    )
}
