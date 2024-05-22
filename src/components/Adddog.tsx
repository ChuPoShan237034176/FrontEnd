import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';



import {

    Form,
    Input,
    InputNumber,
    Select,Button,FloatButton, Modal
  } from 'antd';


const AddDog = (props) => {



  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Dogname, setDogname] = useState('');
  const [Dogbreeds, setDogbreeds] = useState('not specified');
  const [DogAge, setDogAge] = useState('');
  const [Doginfo, setDoginfo] = useState('');

  const [DogPic, setDogPic] = useState<File>();

  const [posts, setPosts] = useState('');


  const handleSelectChange = (value: string) => {
    setDogbreeds(value);
  };
  


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk =async () => {
    await AddDogApi();
    setDogname('');
    setDogAge('');
    setDoginfo('');
    await props.handlerRedraw();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FiletoJson = async() =>{

    const reader = new FileReader();
    
    reader.readAsDataURL(DogPic);
    return new Promise<string>((resolve, reject) => {reader.onload = (e) => {
        resolve(e.target.result);
    }});
  }

  const AddDogApi = async () => {

    let ImgBase64='';
    if(DogPic!=undefined) ImgBase64=await FiletoJson();
    

    const data={ 
        name: Dogname,
        breeds: Dogbreeds,
        age: DogAge,
        info: Doginfo,
        pic: ImgBase64
    }
    console.log("send add dog")
    await axios.post(window.ApiServerURL + '/authorize/adddog', {data}, {headers: {'Authorization': `${window.Userjwt}`} })
    .then(response => {
     setPosts(response.data);
       console.log(response.data);
       
     })
     .catch(error => {
       console.error(error);
     });
  };

  return (
    <>
      <FloatButton  onClick={showModal}  description="Add" icon={<PlusOutlined />}></FloatButton>
      <Modal title="Add Dog" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
            <Form.Item label="Name" rules={[{ required: true, message: 'Please input dog name' }]}>
                <Input onChange={e => setDogname(e.target.value)} value={Dogname} />
            </Form.Item>
            <Form.Item label="breeds">
            <Select defaultValue="not specified"
                  style={{ width: 120 }}
                  onChange={e => handleSelectChange(e)}
                  options={[
                    { value: '', label : 'not specified' },{ value: 'Labrador-Retriever', label : 'Labrador Retriever' },
                    { value: 'Golden-Retriever ', label : 'Golden Retriever ' },{ value: 'Dalmatian', label : 'Dalmatian' },
                    { value: 'Beagle ', label : 'Beagle ' },{ value: 'Yorkshire-Terrier', label : 'Yorkshire Terrier' },
                    { value: 'Schnauzer ', label : 'Schnauzer' },{ value: 'Siberian-Husky', label : 'Siberian Husky' },
                    { value: 'Maltese ', label : 'Maltese ' },{ value: 'Dachshund ', label : 'Dachshund ' },
                    { value: 'German-Shepherd', label : 'German Shepherd' },{ value: 'bouvier', label : 'bouvier' },
                    { value: 'boxer', label : 'boxer' },{ value: 'Shibu-Inu', label : 'Shibu Inu' },
                    { value: 'Akita ', label : 'Akita ' },{ value: 'Old-English-Sheepdog ', label : 'Old English Sheepdog ' },
                    { value: 'Chinese Shar-Pei', label : 'Chinese Shar-Pei' },{ value: 'Welsh-Corgi ', label : 'Welsh-Corgi '  }
                  ]}
            />
            </Form.Item>
            <Form.Item label="Age">
                <Input onChange={e => setDogAge(e.target.value)} value={DogAge}/>
            </Form.Item>
            <Form.Item label="Info">
                <Input.TextArea onChange={e => setDoginfo(e.target.value)} value={Doginfo} showCount maxLength={300} />
            </Form.Item>
            <Form.Item label="Dog photo">
                <input type="file" id="file" onChange={e => setDogPic(e.target.files[0])}/>
            </Form.Item>
            </Form>
            
       </Modal>
    </>
  );
};

export default AddDog;