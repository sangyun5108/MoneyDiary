import React from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {income} from '../redux/actions';

const Income = () => {

    const date = new Date();
    const nowyear = date.getFullYear();
    const nowmonth = date.getMonth()<10?`0${date.getMonth()+1}`:`${date.getMonth()}`;
    const nowdate = date.getDate()<10?`0${date.getDate()}`:`${date.getDate()}`;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];

    const[amount,setAmount] = useState(0);
    const[label,setLabel] = useState('');
    const[inputYear,setInputYear] = useState(nowyear);
    const[inputMonth,setInputMonth] = useState(nowmonth);
    const[inputDate,setInputDate] = useState(nowdate);
    
    const incomeDispatch = useDispatch();
    
    const changeYear = (e) => {
        setInputYear(e.target.value);
    }//연도 입력시 inputyear state 변경시켜주는 함수

    const changeMonth = (e) => {
        setInputMonth(e.target.value);
    }//월 입력시 inputmonth state 변경시켜주는 함수

    const changeDate = (e) => {
        setInputDate(e.target.value);
    }//날짜 입력시 inputDate state 변경시켜주는 함수

    const changeAmount = (e) => {
        setAmount(e.target.value);
    }//가격 입력

    const changeLabel = (e) => {
        setLabel(e.target.value);
    }//내용 입력

    const checkYearType = (e) => {
        const value = Number(e.target.value);
        if(isNaN(value)){
            setInputYear(nowyear);
        }
    }//연도가 올바르게 입력되었는지 체크해주는 함수

    const checkMonthType = (e) => {
        let value = Number(e.target.value);
        if(isNaN(value)){
            setInputMonth(nowmonth);
        }else{
            value = value<10?`0${value}`:value;
            setInputMonth(value);
        }
    }//month가 올바르게 입력되었는지 체크해주는 함수

    const checkDateType = (e) => {
        let value = Number(e.target.value);
        if(isNaN(value)){
            setInputDate(nowdate);
        }else{
            value = value<10?`0${value}`:value;
            setInputDate(value);
        }
    }//date가 올바르게 입력되었는지 체크하는 함수

    const clickDone = (e) =>{
        e.preventDefault();
        const exchangeMonth = months[Number(inputMonth)-1];
        incomeDispatch(income(amount,label,inputYear,exchangeMonth,Number(inputDate)));
    }

    return(
        <>
            <form>
                <div>income</div>
                <input className='inputYear' onChange={changeYear} onBlur={checkYearType} value={inputYear}></input>
                <input className='inputMonth' onChange={changeMonth} onBlur={checkMonthType} value={inputMonth}></input>
                <input className='inputDate' onChange={changeDate} onBlur={checkDateType} value={inputDate}></input>
                <div><input placeholder="Label" onChange={changeLabel}></input></div>
                <div><input placeholder="Amount" onChange={changeAmount}></input></div>
                <button onClick={clickDone}>Done</button>
            </form>
        </>
    )
}

export default Income;