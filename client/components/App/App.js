import React from 'react';
import './App.scss';
import { SemipolarLoading } from 'react-loadingg';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true
        }
    }
    

    componentDidMount(){
        axios.get('/api').then((data)=>console.log(data))
        setTimeout(()=>this.setState({load: false}),1000)
    }
    render() {
        console.log(this.state.load);
        
        return (
            <>
            {this.state.load ? <SemipolarLoading color="red" speed="1" size="large"/> : null}
            <div className="wrapper" style={this.state.load ? {opacity: 0.2} : {}}>
                <div className="sidebar">
                    <a className="create-new-btn" href="/"><img src="/images/plus-solid.svg" alt="x" /><span>Create New</span></a>
                    <ul>
                        <li>
                            <a className="all-notes" href="/">
                                <div className="icon-title" >
                                    <img src="/images/sticky-note-solid.svg" alt="x" />
                                    <span>All Notes</span>
                                </div>
                                <span className="post-number">10</span>
                            </a>
                        </li>
                        <li>
                            <a className="category-btn" href="/">
                                <div className="icon-title">
                                    <img src="/images/tags-solid.svg" alt="x" />
                                    <span>Category</span>
                                </div>
                            </a>
                            <ul className="list-category">
                                <li>
                                    <a href="/" className="list-category__item">
                                        <div className="icon-title">
                                            <img src="/images/tags-solid.svg" alt="x" />
                                            <span>Category-01</span>
                                        </div>
                                        <span className="post-number">10</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="list-category__item">
                                        <div className="icon-title">
                                            <img src="/images/tags-solid.svg" alt="x" />
                                            <span>Category-02</span>
                                        </div>
                                        <span className="post-number">10</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="list-category__item">
                                        <div className="icon-title">
                                            <img src="/images/tags-solid.svg" alt="x" />
                                            <span>Category-03</span>
                                        </div>
                                        <span className="post-number">10</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="clip-btn" href="/">
                                <div className="icon-title">
                                    <img src="/images/paperclip-solid-1.svg" alt="x" />
                                    <span>Clip</span>
                                </div>
                                <span className="post-number">10</span>
                            </a>
                        </li>
                        <li>
                            <a className="clip-btn deleted-btn" href="/">
                                <div className="icon-title">
                                    <img src="./images/trash-solid.svg" alt="x" />
                                    <span>Delete</span>
                                </div>
                            </a>
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
                                <img src="./images/search-solid.svg" alt="" onClick={() => console.log("oke")} />
                            </div>
                        </div>
                        <div className="primary-view__list-todo__sort-title">
                            <h2 className="primary-view__list-todo__sort-title__title">Title</h2>
                            <div className="primary-view__list-todo__sort-title__wrapper-icon-sort">
                                <img src="./images/sort-amount-up-alt-solid.svg" alt="" />
                            </div>
                        </div>
                        <div className="primary-view__list-todo__todos">
                            <ul>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>
                                            <h3>Memo Title</h3>
                                            <div className="wrapper-date-category">
                                                <div className="wrapper-date-category__date">
                                                    <img src="./images/clock-regular-1.svg" alt="" />
                                                    <span>2020/01/27</span>
                                                </div>
                                                <div className="wrapper-date-category__category">
                                                    <img src="./images/tags-solid-1.svg" alt="" />
                                                    <span>Category-01</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapper-icon-tag">
                                            <img src="./images/paperclip-solid-2.svg" alt="" />
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="primary-view__todo-info">
                        <div className="action-area">
                            <button className="btn btn-edit">
                                <img src="./images/pen-solid.svg" alt="" /> Edit
                            </button>
                            <button className="btn btn-save">
                                <img src="./images/save-solid.svg" alt="" /> Save
                            </button>
                            <button className="btn btn-clip">
                                <img src="./images/paperclip-solid.svg" alt="" /> Clip
                            </button>
                            <div className="wrapper-btn-delete">
                                <button className="btn btn-delete">
                                    <img src="./images/trash-solid.svg" alt="" /> Delete
                            </button>
                            </div>
                        </div>
                        <div className="todo-info-area">
                            <div className="wrapper-date-category">
                                <div className="wrapper-date-category__date">
                                    <img src="./images/clock-regular.svg" alt="" />
                                    <span>2020/01/27</span>
                                </div>
                                <div className="wrapper-date-category__category">
                                    <img src="./images/tags-solid-1.svg" alt="" />
                                    <span>Category-01</span>
                                </div>
                            </div>
                            <h2 className="todo-info-area__title">Hello World!</h2>
                            <p className="todo-info-area__content">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default App;