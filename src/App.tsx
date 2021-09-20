import Map from './components/Map/Map'
import Board from './components/Board/Board'
import CountrySearch from './components/CountrySearch/CountrySearch'
import 'antd/dist/antd.css'
import '../node_modules/react-vis/dist/styles/examples.scss'
import './styles/styles.scss'

const App = () => {
    return (
        <>
            <CountrySearch />
            <Board />
            <Map />
        </>
    )
}

export default App
