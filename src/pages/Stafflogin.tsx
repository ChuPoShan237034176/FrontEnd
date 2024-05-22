import { Layout} from 'antd';
import StaffLogin from '../components/StaffLogin';
import PageLink from '../components/PageLink'

const { Header, Content } = Layout;    


const Slogin = () =>{

    return (
        <Layout  style={{height:"100vh", width: '100vw'}}>
            <Header style={{zIndex: 1, position: 'sticky', top: 0}}>
                <PageLink />
            </Header> 
            <Content>
                <StaffLogin />
            </Content>
        </Layout>
    );
}

export default Slogin;