import './App.css'

const App = () => {
    const len = 30000

    return (
        <ul>
            {Array(len)
                .fill(0)
                .map((_, i) => (
                    <li key={i}>{i}</li>
                ))}
        </ul>
    )
}

export default App
