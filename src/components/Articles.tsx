import {useState} from 'react'
import { Flex } from "antd";
import {Form,Input,Button} from 'antd';
import Article from "./Article";


const Articles = (props)=> {

    
    return(
    <>
        <Flex justify='space-evenly' wrap='wrap' gap='middle'>
        {
            props.DataList.map(Item =>  {

                return (        
                    <Article handlerRedraw={props.handlerRedraw} dogID={Item._id} title={Item.name} subtext={Item.info} breeds={Item.breeds} age={Item.age} Pic={Item.Pic} ></Article>
                ) 
            }
            )
        }
        </Flex>
    </>
    )
}

export default Articles;