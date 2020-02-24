import React from 'react';
import { SemipolarLoading } from 'react-loadingg';
import axios from 'axios';

export default (props) => {
    console.log(props.listCategory);
    
    const showCategory = () => {
        return props.listCategory.map((value,index) => (
            <li key={index}>
                <a href="/" className="list-category__item">
                    <div className="icon-title">
                        <img src="/images/tags-solid.svg" alt="x" />
                        <span>{value.name}</span>
                    </div>
                    <span className="post-number">10</span>
                </a>
            </li>
        ))
    }

    return (
        <ul className="list-category">
            {showCategory()}
            {/* <SemipolarLoading size="small" style={{position: 'relative'}}/> */}
        </ul>

    )
}