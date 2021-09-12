import Map from './components/Map/Map'
import Board from './components/Board/Board'
import Controls from './components/Controls/Controls'
import 'antd/dist/antd.css'
import './styles/styles.scss'

const App = () => {
    return (
        <div>
            <Board />
            <Controls />
            <Map />
        </div>
    )
}

export default App
