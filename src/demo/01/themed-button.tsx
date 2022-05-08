/**
 * @description context 保存全局变量
 * @author qingsds
 */
import { createContext, useContext, useState } from 'react'

interface ColorInfo {
    foreground: string
    background: string
}

interface Themes {
    light: ColorInfo
    dark: ColorInfo
}
const themes: Themes = {
    light: { foreground: '#000000', background: '#eeeeee' },
    dark: { foreground: '#ffffff', background: '#222222' },
}

const ThemeContext = createContext<ColorInfo>(themes.light)

function ToggleBar() {
    const theme = useContext(ThemeContext)

    return (
        <div>
            <button
                style={{
                    color: theme.foreground,
                    background: theme.background,
                }}
            >
                i am styed by theme context !
            </button>
        </div>
    )
}

export default function ThemeButton() {
    const [themeColor, setTheme] = useState<'light' | 'dark'>('light')

    const handleToggle = () => {
        setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={themes[themeColor]}>
            <button onClick={handleToggle}>toggle color!</button>
            <ToggleBar />
        </ThemeContext.Provider>
    )
}
