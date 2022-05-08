/**
 * @description 多个请求的处理
 * @author qingsds
 */
import { Fragment, useState } from 'react'
import useArticle from './use-article'
import useComments from './use-comments'
import useUser from './use-user'

const ArticleView = ({ id }: { id: number }) => {
    const { data: article, isLoading, message } = useArticle(id)
    const { data: comments } = useComments(id)
    const { data: user } = useUser(article?.data?.userId)

    if (message) return <p style={{ color: 'red' }}>{message}</p>
    if (isLoading || !article) return <p>Loading...</p>

    return (
        <div className='exp-09-article-view'>
            <h1>
                {id} . {article.data.title}
            </h1>
            {user && (
                <div className='user-info'>
                    <img src={user.avatar} alt='user' height={'40px'} />
                    <div>{user.name}</div>
                    <div>{article.data.createdAt}</div>
                </div>
            )}
            <p>{article.content}</p>
            {comments?.data && (
                <div className='exp-09-comment-list'>
                    <h3>Comments ({comments.data.length})</h3>
                    <dl>
                        {comments.data.map(
                            (item: {
                                id: string
                                user: string
                                content: string
                            }) => (
                                <Fragment key={item.id}>
                                    <dt>{item.user}</dt>
                                    <dd>{item.content}</dd>
                                </Fragment>
                            )
                        )}
                    </dl>
                </div>
            )}
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [id, setId] = useState(1)
    return (
        <div className='exp-09-article-view-wrapper'>
            <ul>
                <li onClick={() => setId(1)}>Article 1</li>
                <li onClick={() => setId(2)}>Article 2</li>
                <li onClick={() => setId(3)}>Article 3</li>
                <li onClick={() => setId(4)}>Article 4</li>
                <li onClick={() => setId(5)}>Article 5</li>
            </ul>
            <ArticleView id={id} />
        </div>
    )
}
