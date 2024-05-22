import { Layout} from 'antd';
import StaffReg from '../components/StaffReg';
import PageLink from '../components/PageLink'

const { Header, Content } = Layout;    


const Slogin = () =>{

    return (
        <Layout  style={{height:"100vh", width: '100vw'}}>
            <Header style={{zIndex: 1, position: 'sticky', top: 0}}>
                <PageLink />
            </Header> 
            <Content>
                <StaffReg />
            </Content>
        </Layout>
    );
}

export default Slogin;