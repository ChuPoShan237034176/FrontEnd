import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';

const DelDog = (props)=> {

    async function ApiDelDog(DogID:string){
        console.log("send del dog")
        const data={
            dogid : DogID
        }
        await axios.post(window.ApiServerURL + '/authorize/deldog', data, {headers: {'Authorization': `${window.Userjwt}`} })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        
        props.handlerRedraw();
        
        console.log("Exit")
    }

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        ApiDelDog(props.dogID);
        console.log(e);
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };

    return(
    <>
        <Popconfirm
            title="Delete this Dog"
            description="Warning! Are you sure you want to delete this Dog?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger ></Button>
        </Popconfirm>
      
    </>
    )
}

export default DelDog;