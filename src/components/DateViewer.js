import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Month, Year } from '../redux/actions'
const Controler = styled.div`
    display : flex;
    justify-content : center;
`
const DateSetContainer = styled.div`
    width : 100%;
    background : white;
    text-align : center;
    font-weight : 600;
    font-size : 60px;
`
const Years = styled.div`
    font-size : 12px;
    color : gray;
`
const Monthselector = styled.div`
    width : 33.33333%;
    margin : 72px 0;
    color : gray;
    &:hover{
        color : black;
        cursor : pointer;
    }
`
const Now = styled.div`
    width : 33.33333%;
    margin: 72px 0;
`
const monthList = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'
]

function DateViewer({date}){//날짜 출력
    const month = date.getMonth()
    const dispatch = useDispatch()
    const onIncrease = () =>{
        dispatch(Month(date.getMonth(date.setMonth(month+1))))
        dispatch(Year(date.getFullYear()))
    }
    const onDecrease = () =>{
        dispatch(Month(date.getMonth(date.setMonth(month-1))))
        dispatch(Year(date.getFullYear()))
    }
    return(
        <DateSetContainer>
            <Controler>
                <Monthselector onClick={()=>onDecrease()}>
                    <Years>
                    {new Date(date.getFullYear(),month-1).getFullYear()}
                    </Years>
                    {monthList[new Date(date.getFullYear(),month-1).getMonth()]}
                </Monthselector>
                <Now>
                    <Years>
                        {date.getFullYear()}
                    </Years>
                    {monthList[month]}
                </Now>
                <Monthselector onClick={()=>onIncrease()}>
                    <Years>
                        {new Date(date.getFullYear(),month+1).getFullYear()}
                    </Years>
                    {monthList[month+1]}
                </Monthselector>
            </Controler> 
        </DateSetContainer>
    )
}

export default DateViewer