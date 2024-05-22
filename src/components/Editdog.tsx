import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';


import {Form,Input,Select,Button,Modal, Image} from 'antd';

let gatData:any;

const EditDog = (props) => {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Dogname, setDogname] = useState('');
  const [Dogbreeds, setDogbreeds] = useState('');
  const [DogAge, setDogAge] = useState('');
  const [Doginfo, setDoginfo] = useState('');
  const [DogPicOld, setDogPicOld] = useState('');

  const [DogPic, setDogPic] = useState<File>();

  const [posts, setPosts] = useState('');

  const handleSelectChange = (value: string) => {
    setDogbreeds(value);
  };

  async function fetchData(DogID:string){
    const getData= await axios.get(window.ApiServerURL + '/public/doglist/getdog?DogID=' + DogID)
        .catch(error => {
        console.error(error);
        });
    
    const DogData=await JSON.parse(getData.data)[0]
    
    setDogname(DogData.name);
    setDogbreeds(DogData.breeds)
    setDogAge(DogData.age)
    setDoginfo(DogData.info)
    setDogPicOld(DogData.Pic)
    console.log("END Load EDIT")
  }


  const showModal =async () => {
    console.log("EditDog")
    await fetchData(props.dogID);
    setIsModalOpen(true);
    console.log("EditDog OPENED")
  };

  const handleOk =async () => {
    await EditDogApi();
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

  const EditDogApi = async () => {

    let ImgBase64='';
    if(DogPic!=undefined) ImgBase64=await FiletoJson();
    

    const data={
        dogid : props.dogID,
        name: Dogname,
        age: DogAge,
        breeds: Dogbreeds,
        info: Doginfo,
        pic: ImgBase64
    }
    console.log(data);
    console.log("send Edit dog")
    await axios.post(window.ApiServerURL + '/authorize/editdog', {data}, {headers: {'Authorization': `${window.Userjwt}`} })
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
      <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={showModal}>
      </Button>
      <Modal title="Edit Dog" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Select defaultValue={Dogbreeds}
                  onChange={e => handleSelectChange(e)}
                  options={[
                    { value: 'affenpinscher', label : 'affenpinscher' },{ value: 'african', label : 'african' },{ value: 'airedale', label : 'airedale' },{ value: 'akita', label : 'akita' },{ value: 'appenzeller', label : 'appenzeller' },{ value: 'australian-shepherd', label : 'shepherd australian' },{ value: 'basenji', label : 'basenji' },{ value: 'beagle', label : 'beagle' },{ value: 'bluetick', label : 'bluetick' },{ value: 'borzoi', label : 'borzoi' },{ value: 'bouvier', label : 'bouvier' },{ value: 'boxer', label : 'boxer' },{ value: 'brabancon', label : 'brabancon' },{ value: 'briard', label : 'briard' },{ value: 'buhund-norwegian', label : 'norwegian buhund' },{ value: 'bulldog-boston', label : 'boston bulldog' },{ value: 'bulldog-english', label : 'english bulldog' },{ value: 'bulldog-french', label : 'french bulldog' },{ value: 'bullterrier-staffordshire', label : 'staffordshire bullterrier' },{ value: 'cattledog-australian', label : 'australian cattledog' },{ value: 'chihuahua', label : 'chihuahua' },{ value: 'chow', label : 'chow' },{ value: 'clumber', label : 'clumber' },{ value: 'cockapoo', label : 'cockapoo' },{ value: 'collie-border', label : 'border collie' },{ value: 'coonhound', label : 'coonhound' },{ value: 'corgi-cardigan', label : 'cardigan corgi' },{ value: 'cotondetulear', label : 'cotondetulear' },{ value: 'dachshund', label : 'dachshund' },{ value: 'dalmatian', label : 'dalmatian' },{ value: 'dane-great', label : 'great dane' },{ value: 'deerhound-scottish', label : 'scottish deerhound' },{ value: 'dhole', label : 'dhole' },{ value: 'dingo', label : 'dingo' },{ value: 'doberman', label : 'doberman' },{ value: 'elkhound-norwegian', label : 'norwegian elkhound' },{ value: 'entlebucher', label : 'entlebucher' },{ value: 'eskimo', label : 'eskimo' },{ value: 'finnish-lapphund', label : 'lapphund finnish' },{ value: 'frise-bichon', label : 'bichon frise' },{ value: 'germanshepherd', label : 'germanshepherd' },{ value: 'greyhound-italian', label : 'italian greyhound' },{ value: 'groenendael', label : 'groenendael' },{ value: 'havanese', label : 'havanese' },{ value: 'hound-afghan', label : 'afghan hound' },{ value: 'hound-basset', label : 'basset hound' },{ value: 'hound-blood', label : 'blood hound' },{ value: 'hound-english', label : 'english hound' },{ value: 'hound-ibizan', label : 'ibizan hound' },{ value: 'hound-plott', label : 'plott hound' },{ value: 'hound-walker', label : 'walker hound' },{ value: 'husky', label : 'husky' },{ value: 'keeshond', label : 'keeshond' },{ value: 'kelpie', label : 'kelpie' },{ value: 'komondor', label : 'komondor' },{ value: 'kuvasz', label : 'kuvasz' },{ value: 'labradoodle', label : 'labradoodle' },{ value: 'labrador', label : 'labrador' },{ value: 'leonberg', label : 'leonberg' },{ value: 'lhasa', label : 'lhasa' },{ value: 'malamute', label : 'malamute' },{ value: 'malinois', label : 'malinois' },{ value: 'maltese', label : 'maltese' },{ value: 'mastiff-bull', label : 'bull mastiff' },{ value: 'mastiff-english', label : 'english mastiff' },{ value: 'mastiff-tibetan', label : 'tibetan mastiff' },{ value: 'mexicanhairless', label : 'mexicanhairless' },{ value: 'mix', label : 'mix' },{ value: 'mountain-bernese', label : 'bernese mountain' },{ value: 'mountain-swiss', label : 'swiss mountain' },{ value: 'newfoundland', label : 'newfoundland' },{ value: 'otterhound', label : 'otterhound' },{ value: 'ovcharka-caucasian', label : 'caucasian ovcharka' },{ value: 'papillon', label : 'papillon' },{ value: 'pekinese', label : 'pekinese' },{ value: 'pembroke', label : 'pembroke' },{ value: 'pinscher-miniature', label : 'miniature pinscher' },{ value: 'pitbull', label : 'pitbull' },{ value: 'pointer-german', label : 'german pointer' },{ value: 'pointer-germanlonghair', label : 'germanlonghair pointer' },{ value: 'pomeranian', label : 'pomeranian' },{ value: 'poodle-medium', label : 'medium poodle' },{ value: 'poodle-miniature', label : 'miniature poodle' },{ value: 'poodle-standard', label : 'standard poodle' },{ value: 'poodle-toy', label : 'toy poodle' },{ value: 'pug', label : 'pug' },{ value: 'puggle', label : 'puggle' },{ value: 'pyrenees', label : 'pyrenees' },{ value: 'redbone', label : 'redbone' },{ value: 'retriever-chesapeake', label : 'chesapeake retriever' },{ value: 'retriever-curly', label : 'curly retriever' },{ value: 'retriever-flatcoated', label : 'flatcoated retriever' },{ value: 'retriever-golden', label : 'golden retriever' },{ value: 'ridgeback-rhodesian', label : 'rhodesian ridgeback' },{ value: 'rottweiler', label : 'rottweiler' },{ value: 'saluki', label : 'saluki' },{ value: 'samoyed', label : 'samoyed' },{ value: 'schipperke', label : 'schipperke' },{ value: 'schnauzer-giant', label : 'giant schnauzer' },{ value: 'schnauzer-miniature', label : 'miniature schnauzer' },{ value: 'segugio-italian', label : 'italian segugio' },{ value: 'setter-english', label : 'english setter' },{ value: 'setter-gordon', label : 'gordon setter' },{ value: 'setter-irish', label : 'irish setter' },{ value: 'sharpei', label : 'sharpei' },{ value: 'sheepdog-english', label : 'english sheepdog' },{ value: 'sheepdog-shetland', label : 'shetland sheepdog' },{ value: 'shiba', label : 'shiba' },{ value: 'shihtzu', label : 'shihtzu' },{ value: 'spaniel-blenheim', label : 'blenheim spaniel' },{ value: 'spaniel-brittany', label : 'brittany spaniel' },{ value: 'spaniel-cocker', label : 'cocker spaniel' },{ value: 'spaniel-irish', label : 'irish spaniel' },{ value: 'spaniel-japanese', label : 'japanese spaniel' },{ value: 'spaniel-sussex', label : 'sussex spaniel' },{ value: 'spaniel-welsh', label : 'welsh spaniel' },{ value: 'spitz-japanese', label : 'japanese spitz' },{ value: 'springer-english', label : 'english springer' },{ value: 'stbernard', label : 'stbernard' },{ value: 'terrier-american', label : 'american terrier' },{ value: 'terrier-australian', label : 'australian terrier' },{ value: 'terrier-bedlington', label : 'bedlington terrier' },{ value: 'terrier-border', label : 'border terrier' },{ value: 'terrier-cairn', label : 'cairn terrier' },{ value: 'terrier-dandie', label : 'dandie terrier' },{ value: 'terrier-fox', label : 'fox terrier' },{ value: 'terrier-irish', label : 'irish terrier' },{ value: 'terrier-kerryblue', label : 'kerryblue terrier' },{ value: 'terrier-lakeland', label : 'lakeland terrier' },{ value: 'terrier-norfolk', label : 'norfolk terrier' },{ value: 'terrier-norwich', label : 'norwich terrier' },{ value: 'terrier-patterdale', label : 'patterdale terrier' },{ value: 'terrier-russell', label : 'russell terrier' },{ value: 'terrier-scottish', label : 'scottish terrier' },{ value: 'terrier-sealyham', label : 'sealyham terrier' },{ value: 'terrier-silky', label : 'silky terrier' },{ value: 'terrier-tibetan', label : 'tibetan terrier' },{ value: 'terrier-toy', label : 'toy terrier' },{ value: 'terrier-welsh', label : 'welsh terrier' },{ value: 'terrier-westhighland', label : 'westhighland terrier' },{ value: 'terrier-wheaten', label : 'wheaten terrier' },{ value: 'terrier-yorkshire', label : 'yorkshire terrier' },{ value: 'tervuren', label : 'tervuren' },{ value: 'vizsla', label : 'vizsla' },{ value: 'waterdog-spanish', label : 'spanish waterdog' },{ value: 'weimaraner', label : 'weimaraner' },{ value: 'whippet', label : 'whippet' },{ value: 'wolfhound-irish', label : 'irish wolfhound' }
                  ]} />
            </Form.Item>
            <Form.Item label="Age">
                <Input onChange={e => setDogAge(e.target.value)} value={DogAge}/>
            </Form.Item>
            <Form.Item label="Info">
                <Input.TextArea onChange={e => setDoginfo(e.target.value)} defaultValue={Doginfo} showCount maxLength={300} />
            </Form.Item>
            <Form.Item label="Now photo">
              <Image width={200} src={DogPicOld}/>
            </Form.Item>
            <Form.Item label="New photo">
                <input type="file" id="file" onChange={e => setDogPic(e.target.files[0])}/>
            </Form.Item>
            </Form>
            
       </Modal>
    </>
  );
};

export default EditDog;