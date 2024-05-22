import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { FloatButton,Select, Form, Input, Modal } from 'antd';



export const Searchdog = (props) => {

    const [Dogname, setDogname] = useState('');
    const [Dogbreeds, setDogbreeds] = useState('');
    const [DogAge, setDogAge] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    setDogbreeds(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {

    interface IsearchData{
        name?:string;
        breeds?:string;
        age?:string;
    }

    let SearchData:IsearchData={};

    if(Dogname!='') SearchData.name=Dogname;
    if(Dogbreeds!='') SearchData.breeds=Dogbreeds;
    if(DogAge!='') SearchData.age=DogAge;

    props.handlerSetSearchData(JSON.stringify(SearchData));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FloatButton  onClick={showModal}  description="Search" style={{ bottom: 28 + 75 }} icon={<SearchOutlined />}></FloatButton>
      <Modal title="Search" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
            labelCol={{ span: 40 }}
            wrapperCol={{ span: 28 }}
            layout="horizontal"
            style={{ maxWidth: 800 }}
            >
            <Form.Item label="Name" rules={[{ required: true, message: 'Please input dog name' }]}>
                <Input onChange={e => setDogname(e.target.value)} value={Dogname} />
            </Form.Item>
            <Form.Item label="Breeds">
            <Select defaultValue=""
                  
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
                    { value: 'Chinese Shar-Pei', label : 'Chinese Shar-Pei' },{ value: 'Welsh-Corgi ', label : 'Welsh-Corgi ' },
             
                  ]}

            />
            </Form.Item>
            <Form.Item label="Age">
                <Input onChange={e => setDogAge(e.target.value)} value={DogAge}/>
            </Form.Item>
            </Form>
      </Modal>
    </>
  );
};

export default Searchdog;