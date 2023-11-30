import { useState } from "react";

interface IUseTracker<T>{
    indexInput: number;
    skipInput: number;
    itemsInput: T[];
    fetchItem: (skip: number) => Promise<T[]>;
}

export interface ITracker<T>{
    items: T[];
    index: number;
    skip: number;
    getItem: () => T;
    previous: () => void;
    next: () => void;
}

export default function useTracker<T>(
    {
        indexInput,
        skipInput,
        itemsInput,
        fetchItem
    }: IUseTracker<T>
){
    const [index, setIndex] = useState(indexInput)
    const [skip, setSkip] = useState(skipInput)
    const [items, setItems] = useState(itemsInput)
    
    async function previous(){
        if(index > 0){
            setIndex(index - 1);
        }else{
            if(skip <= 0){
                return
            }

            const tempSkip = (skip - 10) <= 0 ? 0 : (skip - 10)
            const tempItems = await fetchItem(tempSkip)
            setItems(tempItems)
            setIndex(tempItems.length - 1)
            setSkip(tempSkip)
        }
    }
                                                                                                                         
    async function next(){
        let tempSkip = skip
        if(items.length - 1 > index){
            setIndex(index + 1)
        }else{
            tempSkip = skip + 10
            const tempItems = await fetchItem(tempSkip)
            if(tempItems.length <= 0){
                return
            }else{
                setItems(tempItems)
                setIndex(0)
                setSkip(tempSkip)
            }
        }
    }

    function getItem(): T{
        return items[index]
    }

    return {index, items, skip, getItem, previous, next} as ITracker<T>
}