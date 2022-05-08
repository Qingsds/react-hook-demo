/**
 * @description 列表
 * @author qingsds
 */

import { Select, Table } from 'antd'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { ENDPOINT } from '../api'
import { useFetch } from '../hook'

/**
 * 调用 api 获取 articles 数组
 * @returns articles array
 */
const useArticles = () => {
    const [state] = useFetch(`${ENDPOINT}posts`)
    return [state.data, state.isLoading, state.message] as const
}

/**
 * 调用 api 获取 categories 数组
 * @returns categories array
 */
const useCategories = () => {
    const [state] = useFetch(`${ENDPOINT}categories`)
    return [state.data, state.isLoading, state.message] as const
}

/**
 * 合并 articles categories 数据
 * @param articles 
 * @param categories 
 * @returns articles array
 */
const useCombinedArticles = (articles: any[], categories: any[]) => {
    const data = useMemo(() => {
        if (!articles.length || !categories.length) return

        return articles.map(article => {
            return {
                ...article,
                category:
                    categories.find(category => {
                        return parseInt(category.id) === article.categoryId
                    })?.name || '',
            }
        }, {})
    }, [articles, categories])

    return data
}
/**
 * 通过 selectCategory 筛选 articles
 * @param articles 
 * @param selectCategory 筛选项
 * @returns articles array
 */
const useFilteredArticles = (
    articles: any[],
    selectCategory: string | null
) => {
    const data = useMemo(() => {
        if (!articles) return
        if (!selectCategory) return articles

        return articles.filter(article => {
            return article.category === selectCategory
        })
    }, [articles, selectCategory])
    return data
}

const columns = [
    { dataIndex: 'title', title: 'Title' },
    { dataIndex: 'category', title: 'Category' },
]

export default function BlogList() {
    const [selectCategory, setSelectCategory] = useState<string | null>(null)

    const [articles, articlesLoading, articlesErrorMessage] = useArticles()
    const [categories, categoriesLoading, categoriesErrorMessage] =
        useCategories()

    // 合并数据并根据 selectCategory 获取数据
    let result = useCombinedArticles(articles || [], categories || [])
    result = useFilteredArticles(result || [], selectCategory)

    const options = useMemo(() => {
        const arr = _.uniqBy(
            categories,
            (c: { name: string | null }) => c.name
        ).map(c => ({
            value: c.name,
            label: c.name,
        }))

        arr.unshift({ value: null, label: 'All' })
        return arr
    }, [categories])

    // 处理错误状态和加载状态
    if (articlesLoading || categoriesLoading) return <h3>loading...</h3>
    if (articlesErrorMessage)
        return <span style={{ color: 'red' }}>{articlesErrorMessage}</span>
    if (categoriesErrorMessage)
        return <span style={{ color: 'red' }}>{categoriesErrorMessage}</span>

    return (
        <div>
            <h2>blog list</h2>
            <Select
                value={selectCategory}
                options={options}
                onChange={val => setSelectCategory(val)}
                style={{ width: '200px' }}
                placeholder={'place select a category'}
            />
            <Table dataSource={result} columns={columns} rowKey={'id'} />
        </div>
    )
}
