import _ from 'lodash'
import { useHash } from 'react-use'

const Page1 = () => <>page1</>
const Page2 = () => <>page2</>
const Page3 = () => <>page3</>
const Page4 = () => <>page4</>

const MyRouter = ({ children }) => {
    const routes = _.keyBy(
        children.map(c => c.props),
        'path'
    )
    const [hash] = useHash()
    const Page = routes[hash.replace('#', '')]?.component
    return Page ? <Page /> : <span>page not found</span>
}

const Route = () => null

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <>
            <h1>my router</h1>
            <div className='exp-15-my-router'>
                <div className='exp-15-sider'>
                    <a href='#page1'>Page 1</a>
                    <a href='#page2'>Page 2</a>
                    <a href='#page3'>Page 3</a>
                    <a href='#page4'>Page 4</a>
                </div>
                <div className='exp-15-page-container'>
                    <MyRouter>
                        <Route path={'page1'} component={Page1}>
                            P1
                        </Route>
                        <Route path={'page2'} component={Page2}>
                            P2
                        </Route>
                        <Route path={'page3'} component={Page3}>
                            P3
                        </Route>
                        <Route path={'page4'} component={Page4}>
                            P4
                        </Route>
                    </MyRouter>
                </div>
            </div>
        </>
    )
}
