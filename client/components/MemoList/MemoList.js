import React, {  } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as Actions from '../../actions/app.actions'

export default (props) => {
    const dispatch = useDispatch();
    const showMemoList = () => {
        return props.listMemo.map((value)=>
            (<li key={value._id} onClick={()=>{
                dispatch(Actions.actSetIdMemoClicked(value._id))
            }}>
                <button>
                    <div>
                        <h3>{value.title}</h3>
                        <div className="wrapper-date-category">
                            <div className="wrapper-date-category__date">
                                <img src="./images/clock-regular-1.svg" alt="" />
                                <span>{moment(value.dateCreated).format("YYYY/MM/DD")}</span>
                            </div>
                            <div className="wrapper-date-category__category">
                                <img src="./images/tags-solid-1.svg" alt="" />
                                <span>{value.category.name}</span>
                            </div>
                        </div>
                    </div>
                    {value.isClip ? <div className="wrapper-icon-tag">
                        <img src="./images/paperclip-solid-2.svg" alt="" />
                    </div> : ''}
                </button>
            </li>)
        )
    }

    return (
        <div className="primary-view__list-todo__todos">
            <ul>
                {showMemoList()}
                
            </ul>
        </div>

    )

}
