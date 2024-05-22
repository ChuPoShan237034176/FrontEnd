import { Layout, Flex, Image} from 'antd';

import PageLink from '../components/PageLink'

const { Header, Content } = Layout;    



const Home = () =>{
   
    return (
        <Layout style={{minHeight:"100vh", width: '100vw'}}>
            <Header  style={{ zIndex: 1, position: 'sticky', top: 1}}>
                <PageLink />
            </Header> 
            <Content>
                <h1>Welcome To Dog Paradise</h1>
                <p> This is a paradise for dogs, please take them home and give them love </p>
                <Image width={900} src="https://companyofanimals.com/uk/wp-content/uploads/sites/7/2021/02/shutterstock_714335119-scaled.jpg" />
            </Content>
        </Layout>
        
        
        
    );
}

export default Home;