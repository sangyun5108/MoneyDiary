import { useSelector } from 'react-redux';
import transformation from '../utils/transformation';

export const useGiveSum = (type,month,year) => {
    const {list:lists} = useSelector((state)=>(state.incomeExpeditureReducer));
    const sum = lists.filter((list)=>list.type===type&&list.month===month&&Number(list.year)===year)
    .map((list)=>{
        return Number(list.amount);
    })
    .reduce((acc,cur)=>{
        return acc+cur;
    },0);
    return transformation(sum);
}