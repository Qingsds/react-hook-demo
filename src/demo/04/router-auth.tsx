import { Button } from 'antd'
import { useState } from 'react'
import { Link, Route, Redirect } from 'react-router-dom'

const Page1 = () => <span>page-1</span>
const Page2 = () => <span>page-2</span>

const UnauthedPage = () => (
    <span style={{ color: 'red' }}>Unauthorized, place log first</span>
)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [logged, toggleLogged] = useState(false)
    const routes = logged
        ? [
              {
                  path: '/06/RouterAuth/page1',
                  component: Page1,
              },
              {
                  path: '/06/RouterAuth/page2',
                  component: Page2,
              },
          ]
        : [{ path: '/06/RouterAuth', component: UnauthedPage }]

    return (
        <div>
            <h1>Router Auth</h1>
            <Button
                type={logged ? 'primary' : 'default'}
                onClick={() => toggleLogged(v => !v)}
            >
                {logged ? 'logout' : 'login'}
            </Button>

            <div className='exp-15-router-auth'>
                <div className='exp-15-sider'>
                    <Link to={'/06/RouterAuth/page1'}>page-1</Link>
                    <Link to={'/06/RouterAuth/page2'}>page-2</Link>
                </div>
                <div className='exp-15-page-container'>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                component={route.component}
                            />
                        )
                    })}
                    <Redirect
                        from='/06/RouterAuth'
                        to={'/06/RouterAuth/page1'}
                    />
                </div>
            </div>
        </div>
    )
}
