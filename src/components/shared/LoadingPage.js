import { Spinner } from 'react-bootstrap'


const LoadingScreen = () => (
    <div style={{textAlign: 'center'}}>
        <Spinner role="status" animation="border">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h1>yoopo</h1>
    </div>

)

export default LoadingScreen