/**
 * @description demo 的入口文件
 * @author qingsds
 */

import BlogList from './01/blog-list'
import Counter from './01/counter'
import ScrollTop from './01/scroll-top'
import SearchUserList from './01/search-user-list'
import ThemeButton from './01/themed-button'
import Timer from './01/timer'
import UserList from './01/user-list'
import SelectMoneyCurrency from './02/price-input'
import SearchBox from './02/search-box'
import ArticleView from './02/article-view'
import ListWhitMore from './02/list-whit-more'
import UserList2 from './02/user-list2'
import KeyPressExample from './02/key-press-example'
import FormComponent from './02/form-component'
import UserLayout from './03/user-layout'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import myRouter from './04/my-router'
import NestedRouting from './04/nested-routing'

const routes = [
    ['01 Counter', Counter],
    ['02 BlogList', BlogList],
    ['03 ScrollTop', ScrollTop],
    ['03 SearchUserList', SearchUserList],
    ['04 ThemeButton', ThemeButton],
    ['05 Timer', Timer],
    ['05 UserList', UserList],
    ['05 SelectMoneyCurrency', SelectMoneyCurrency],
    ['05 SearchBox', SearchBox],
    ['05 ArticleView', ArticleView],
    ['05 ListWhitMore', ListWhitMore],
    ['05 UserList2', UserList2],
    ['05 KeyPressExample', KeyPressExample],
    ['05 FormComponent', FormComponent],
    ['05 UserLayout', UserLayout],
    ['06 myRouter', myRouter],
    ['06 NestedRouting', NestedRouting],
]

const Empty = () => null
export default function Index() {
    return (
        <Router>
            <div className='app'>
                <Empty />
                <ul className='sider'>
                    {routes.map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item[0].replace(' ', '/')}`}>
                                {item[0]}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div id='pageContainer' className='page-container'>
                    <Switch>
                        {routes.map(
                            ([label, Component, additionalRoute = '']) => (
                                <Route
                                    key={label}
                                    path={`/${label.replace(
                                        ' ',
                                        '/'
                                    )}${additionalRoute}`}
                                >
                                    <Component />
                                </Route>
                            )
                        )}
                        <Route path={'/'} exact>
                            <h1>happy coding</h1>
                        </Route>
                        <Route
                            path={'*'}
                            component={() => <span>page is not found</span>}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
