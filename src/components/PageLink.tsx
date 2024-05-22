import { Typography ,Carousel, Radio } from 'antd';
import { Link} from "react-router-dom";
import '../globalvar'



const PageLink = () => {
  
      return (
       
        <nav>
        <ul>
          <li>
        
            <Radio.Button><Link to="/">Home</Link></Radio.Button> &nbsp;&nbsp;
            <path />
            <Radio.Button><Link to="/doglist">Dogs Information</Link></Radio.Button>
             &nbsp;&nbsp;{window.UserName ? "" : 
            <Radio.Button><Link to="/slogin">Login</Link></Radio.Button>}

          </li>
        </ul>
      </nav>
     
      )
}

export default PageLink