import React from 'react';
// import { SemipolarLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions/app.actions'

export default (props) => {
    const dispatch = useDispatch();

    let listMemo = useSelector(state => state.memo)

    const { setIsSearch, setIsClip, setIsDeleted, listCategory } = props

    listMemo = listMemo.filter(v => !v.dateDeleted)

    const idCategoryClicked = useSelector(state => state.idCategoryClicked)
    const showCategory = () => {
        return listCategory.map((value) => (
            <li key={value._id}
                style={{marginRight: document.getElementById('list-category').offsetHeight === 378 ? "11px" : "15px"}}
                className={idCategoryClicked === value._id ? "list-category__item activeItem" : "list-category__item"}
                onClick={e => {
                    dispatch(Actions.actSetIdMemoClicked(''))
                    setIsSearch(false)
                    setIsClip(false)
                    setIsDeleted(false)
                    idCategoryClicked === value._id ? dispatch(Actions.actSetIdCategoryClicked('')) : dispatch(Actions.actSetIdCategoryClicked(value._id));
                }}>

                <div className="icon-title">
                    <img src="/images/tags-solid.svg" alt="x" />
                    <span>{value.name}</span>
                </div>
                <span className="post-number">{listMemo.filter(v => v.category._id === value._id).length}</span>
            </li>
        ))
    }

    return (
        <ul className="list-category" id="list-category">
            {showCategory()}
        </ul>
    )
}