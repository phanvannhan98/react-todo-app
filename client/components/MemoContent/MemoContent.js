import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as Actions from '../../actions/app.actions'

export default (props) => {

    const idMemoClicked = useSelector(state => state.idMemoClicked);
    const listMemo = props.listMemo;

    const dispatch = useDispatch();

    let memo;
    if (listMemo.length) {
        memo = listMemo.find(value => value._id === idMemoClicked) || listMemo[0];

        if(!idMemoClicked || memo._id !== idMemoClicked){
            dispatch(Actions.actSetIdMemoClicked(memo._id))
        }
    }else{
        if(idMemoClicked){
            dispatch(Actions.actSetIdMemoClicked(''))
        }
    }
    
    if (memo)
        return (
            <div className="todo-info-area">
                <div className="wrapper-date-category">
                    <div className="wrapper-date-category__date">
                        <img src="./images/clock-regular.svg" alt="" />
                        <span>{moment(memo.dateCreated).format("YYYY/MM/DD")}</span>
                    </div>
                    <div className="wrapper-date-category__category">
                        <img src="./images/tags-solid-1.svg" alt="" />
                        <span>{memo.category.name}</span>
                    </div>
                </div>
                <h2 className="todo-info-area__title">{memo.name}</h2>
                <p className="todo-info-area__content">
                    {memo.content}
                </p>
            </div>
        )

    return ''
}
