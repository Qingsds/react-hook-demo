/**
 * @description 受控组件
 * @author qingsds
 */

import { useCallback, useState } from 'react'

type currency = 'rmb' | 'dollar' | 'eur'

interface MoneyInfo {
    amount: number
    currency: currency
}

const PriceInput = ({
    value = { amount: 0, currency: 'rmb' },
    onChange,
}: {
    value: MoneyInfo | undefined
    onChange: (value: MoneyInfo) => void
}) => {
    const handleChange = useCallback(
        (updateVal: Partial<MoneyInfo>) => {
            onChange({ ...value, ...updateVal })
        },
        [onChange, value]
    )
    return (
        <div className='exp-02-price-input'>
            <input
                type='text'
                value={value.amount}
                onChange={e =>
                    handleChange({ amount: Number(e.target.value) || 0 })
                }
            />
            <select
                value={value.currency}
                defaultValue={'rmb'}
                onChange={e =>
                    handleChange({ currency: e.target.value as currency })
                }
            >
                <option value='rmb'>RMB</option>
                <option value='dollar'>Dollar</option>
                <option value='eur'>EUR</option>
            </select>
        </div>
    )
}

export default function SelectMoneyCurrency() {
    const [money, setMoney] = useState<MoneyInfo | undefined>(undefined)
    return (
        <div>
            <PriceInput value={money} onChange={setMoney} />
            <p>{JSON.stringify(money)}</p>
        </div>
    )
}
