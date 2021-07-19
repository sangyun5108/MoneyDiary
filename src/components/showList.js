import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import transformation from '../utils/transformation';
import useFilterList from '../hooks/useFilterList';
import { getId } from '../utils/getId';
import { deletelist } from '../redux/reducers/incomeExpeditureReducer';

const UlWrapper = styled.ul`
    padding-left:0px;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-conten:center;
`;

const ListWrapper = styled.div`
    width:550px;
    padding:0px 10px 0px 10px;
    height:80px;
    border-radius:20px;
    background:#f5f5f5;
    margin-bottom:15px;
    display:flex;
    align-items:center;
    position:relative;
`;

const List = styled.li`
    list-style:none;
    width:600px;
    height:px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;

const Label = styled.div`
    font-weight:700;
    font-size:20px;
`;

const Amount = styled.div`
    color:${props=>props.active>=0?"#166ff3":"#f8123b"};
    font-weight:700;
    margin-right:20px;
    font-size:20px;
`;

const Datelist = styled.div`
    text-align:center;
    margin-bottom:5px;
    font-size:17px;
    color:grey;
`;

const DeleteBtn = styled.button`
    position:absolute;
    width:30px;
    height:30px;
    top:0px;
    right:0px;
    border-radius:50%;
    outline:none;
    text-align:center;
    border:none;
    background:none;
    &:hover{
        cursor:pointer;
    }
`;

const MoneyTypeAndLabel =styled.div`
    margin-left:20px;
`;

const MoneyType = styled.div`
    font-size:15px;
    font-weight:600;
    margin-bottom:5px;
    color:grey;
`;

const ShowList = () => {

    let newLists;
    let listdate=0;

    const {list:lists} = useSelector((state)=>state.incomeExpeditureReducer);
    const dispatch = useDispatch();
    let {type,month,year} = useSelector((state)=>state.showListReducer);

    newLists = useFilterList(type,month,year);

    const checkDate = (date) => {
        if(date!==listdate){
            listdate = date;
            return true;
        } else {
            return false;
        }
    }

    const deleteList = (id) => {
        const deleteId = id;
        const list = lists
        .filter((list)=>{
            return list.id!==deleteId;
        })
        .sort((a,b)=>{
            return a.id-b.id;
        });
        localStorage.setItem('lists',JSON.stringify(list));
        let incomeId = getId('INCOME',0);
        let expeditureId = getId('EXPEDITURE',100);
        dispatch(deletelist({list,
            incomeId,
            expeditureId
        }));
    }
    
    return(
        <>
            <UlWrapper>
                {newLists.map((list)=>{
                    return(
                        <div key={list.id}>
                                    {checkDate(list.date)?(
                                        <Datelist>
                                            {list.day}, {list.date}th
                                        </Datelist>
                                    ):''}
                            <ListWrapper> 
                                <List>
                                    <MoneyTypeAndLabel>
                                        <MoneyType>{list.moneyType}</MoneyType>
                                        <Label>{list.label}</Label>
                                    </MoneyTypeAndLabel>
                                    <Amount active={list.amount}>{list.amount>0?`+${transformation(list.amount)}`:transformation(list.amount)}</Amount>
                                    <DeleteBtn onClick={()=>deleteList(list.id)}>X</DeleteBtn>
                                </List>
                            </ListWrapper>
                        </div>
                    );
                })}
            </UlWrapper>
        </>
    )
}

export default ShowList;