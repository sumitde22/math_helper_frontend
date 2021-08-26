import { useDispatch, useSelector } from "react-redux"
// both imports are for rendering LaTeX in this app
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { Alert } from "react-bootstrap";
import { hideNotification } from "../reducers/reducer";

// component for flexibly displaying notification throughout the app
const Notification = ({section}) => {
    // used to dispatch actions to change state 
    const dispatch = useDispatch()
    // get what notification to display (if there is one) and what section to display it in
    const notificationInfo = useSelector(state => state.notificationInfo)
    // render notification in this specific instance if state indicates it should be rendered here
    if (notificationInfo.show && notificationInfo.section === section) {
        const textMessage = notificationInfo.message
        // creating inline math text to display if indicated
        const mathEquation = notificationInfo.math_expression !== null ? <TeX math={notificationInfo.math_expression} /> : null
        // display notification and allow user to close it
        return <Alert variant={notificationInfo.success ? "success" : "danger"} onClose={() => dispatch(hideNotification())} dismissible>{textMessage}{mathEquation}</Alert>
    } else {
        return null
    }
}

export default Notification