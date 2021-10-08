import Map from './components/Map/Map'
import Board from './components/Board/Board'
import CountrySearch from './components/CountrySearch/CountrySearch'
import 'antd/dist/antd.css'
import '../node_modules/react-vis/dist/styles/examples.scss'
import './styles/styles.scss'

const App = () => {
    return (
        <>
            <Map />
            <CountrySearch />
            <Board />
        </>
    )
}

export default App
