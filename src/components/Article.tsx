import { Card } from "antd";
import EditDog from "./Editdog";
import DelDog from "./Deldog";

const {Meta} = Card

const Article = (props)=> {
    return(
        <>
            <Card style={{ width: 380 }} cover={<img alt={props.title} src={props.Pic ? props.Pic : "https://cdn.dribbble.com/users/77598/screenshots/12570694/media/8eaa19b2448ee8719f559e4d1ec931bc.gif"} />}>
            {window.Userjwt ? (<EditDog handlerRedraw={props.handlerRedraw} dogID={props.dogID}/>) : ""}  
            {window.Userjwt ? (<DelDog handlerRedraw={props.handlerRedraw} dogID={props.dogID}/>):""}
                <Meta title={props.title + " (Age:" + props.age + " " + props.breeds +")"} description={props.subtext} />
            </Card>
        </>
    )
}

export default Article;