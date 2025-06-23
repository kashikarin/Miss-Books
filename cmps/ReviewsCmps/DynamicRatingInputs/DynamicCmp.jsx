

import { RateBookStars } from "./RateBookStars.jsx"
import {RateBookSelect} from './RateBookSelect.jsx'
import {RateBookTxtBox} from './RateBookTxtBox.jsx'

export function DynamicCmp(props){
    
    const cmpMap = {
        select: <RateBookSelect {...props}/>,
        text: < RateBookTxtBox {...props}/>,
        stars: <RateBookStars {...props} />
    }
    
    return cmpMap[props.cmpType]
}