import { useState, useEffect } from 'react';
import { Button, Input, Layout } from 'antd';
import axios from 'axios';

import Articles from '../components/Articles';
import PageLink from '../components/PageLink';
import Adddog from '../components/Adddog';
import Searchdog  from '../components/Searchdog';

const { Header, Content } = Layout;    


const  Doglist = () =>{

    const fetchData=async (search) => {
        console.log(search);
        const PostData= await axios.get(window.ApiServerURL + '/public/doglist/getdogs?searchdata=' + search)
            .catch(error => {
                console.error(error);
                return;
            });
        console.log(PostData.data)
        
        setDataList(await JSON.parse(PostData.data));
        //console.log(ddd);
    }

    const [searchData, setSearchData] = useState('{}');
    const [DataList, setDataList] = useState(() =>{
        fetchData("{}");
        return [{_id:'',name:'',age:'',info:'',Pic:''}];
    });
    

    const handlerRedraw=async () => {
        console.log("redrow Dog", searchData);
        await fetchData(searchData);
     }

    const handlerSetSearchData=async (data:string) => { 
        console.log("Set search");
        setSearchData(data);
        console.log("Call reload");
        await fetchData(data);
    }
    


    
    return (
        <Layout  style={{minHeight:"100vh", width: '100vw'}}>
            <Header style={{zIndex: 1, position: 'sticky', top: 0}}>
                <PageLink />
            </Header> 
            <Content>
                <hr></hr>
                {window.Userjwt ? (<Adddog handlerRedraw={handlerRedraw}/>):""} <Searchdog handlerSetSearchData={handlerSetSearchData}/>
                <Articles  handlerRedraw={handlerRedraw} DataList={DataList} />
            </Content>
        </Layout>
    );
    
}

export default Doglist;