import React from 'react';
import { SemipolarLoading } from 'react-loadingg';
import { useDispatch,useSelector } from 'react-redux';
import * as Actions from '../../actions/app.actions'

export default (props) => {
    const dispatch = useDispatch();

    const idCategoryClicked = useSelector(state => state.idCategoryClicked)


    const showCategory = () => {
        return props.listCategory.map((value) => (
            <li key={value._id}
                className={idCategoryClicked === value._id ? "list-category__item activeItem" : "list-category__item"}
                onClick={e => {
                    dispatch(Actions.actSetIdCategoryClicked(value._id));
                    dispatch(Actions.actSetIdMemoClicked(''))
                }}>

                <div className="icon-title">
                    <img src="/images/tags-solid.svg" alt="x" />
                    <span>{value.name}</span>
                </div>
                <span className="post-number">10</span>
            </li>
        ))
    }

    return (
        <ul className="list-category">
            {showCategory()}
        </ul>
    )
}