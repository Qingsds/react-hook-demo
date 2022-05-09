import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom'

const Page1 = () => {
    return (
        <div className='exp-15-page1'>
            <div className='exp-15-page1-header'>
                <Link to={'/06/NestedRouting/page1/general'}>general</Link>
                <Link to={'/06/NestedRouting/page1/profile'}>profile</Link>
                <Link to={'/06/NestedRouting/page1/setting'}>setting</Link>
            </div>
            <div className='exp-15-page1-content'>
                <Route path={'/06/NestedRouting/page1/general'}>
                    page for general;
                </Route>
                <Route path={'/06/NestedRouting/page1/profile'}>
                    page for profile;
                </Route>
                <Route path={'/06/NestedRouting/page1/setting'}>
                    page for setting;
                </Route>
            </div>
        </div>
    )
}
const Page2 = () => <>page 2</>
const Page3 = () => <>page 3</>

const NestedRouting = () => {
    return (
        <BrowserRouter>
            <h1>nested routing</h1>
            <div className='exp-15-NestedRouting'>
                <div className='exp-15-sider'>
                    <Link to={'/06/NestedRouting/page1'}>page1</Link>
                    <Link to={'/06/NestedRouting/page2'}>page2</Link>
                    <Link to={'/06/NestedRouting/page3'}>page3</Link>
                </div>
                <div className='exp-15-page-container'>
                    <Route path={'/06/NestedRouting/page1'} component={Page1} />
                    <Route path={'/06/NestedRouting/page2'} component={Page2} />
                    <Route path={'/06/NestedRouting/page3'} component={Page3} />
                    <Redirect
                        from='/06/NestedRouting'
                        to={'/06/NestedRouting/page1'}
                    />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default NestedRouting
