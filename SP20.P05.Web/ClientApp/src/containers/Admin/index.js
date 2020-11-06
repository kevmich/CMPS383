import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem,
   NavLink, Card, Button, CardTitle, 
    Row, Col, FormGroup, Label, Input, 
    Toast, ToastBody, ToastHeader} from 'reactstrap';
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Admin = (props) => {
  const [farmObj, setFarmObj] = useState({farmData: [], CheckUpdate: false});
  const [userObj, setUserObj] = useState({userData: [], isUpdate: false});
  const [activeTab, setActiveTab] = useState('2');
    const [farmStore, setFarmStore] = useState({ Name: "", Description: "", Active: false, Dimensions: { Height: 0, Width: 0 }, });
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [toastFarmVisible, setToastFarmVisible] = useState(null);
    const [toastUserVisible] = useState(null);



  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(()=>{
    if(farmObj.CheckUpdate === true){

       const fetchData = async() =>{
        await axios({
        method: 'post',
        url: '/api/farm-fields',
        config: { headers: { 'Content-Type': 'application/json' } },
        data: {
          Name: farmStore.Name,
          Description: farmStore.Description,
          Active: farmStore.Active,
          Dimensions: {
            Height: parseInt(farmStore.Dimensions.Height),
            Width: parseInt(farmStore.Dimensions.Width),
          }
        }
        }).then(response => {
        var farmData = response.data;
        setFarmObj({farmData: farmData, checkUpdate: false})
        setToastFarmVisible(true);
        setTimeout(()=>{setToastFarmVisible(false)}, 3000);
      }).catch(e =>{
        setFarmObj({checkUpdate: false});
      });
    }
    fetchData();
  }
    if(userObj.isUpdate === true){
      const GettingData = async() =>{
          await axios({
          method: 'post',
          url: '/api/users',
          config: { headers: { 'Content-Type': 'application/json' } },
          data: {
              UserName: userName,
              Password: userPassword,
            Role : userRole
          }
        }).then(response => {
          var userData = response.data;
          setUserObj({userData: userData, isUpdate: false})
         }).catch(e =>{
          setUserObj({isUpdate: false});
        });
      }

      GettingData();
    }
    
  });
  
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Create
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Farm Field</CardTitle>
                 <FormGroup>
                    <Input onChange={(e) => {setFarmStore({Name:e.target.value,Description:farmStore.Description, Active: farmStore.Active, Dimensions: {Height:farmStore.Dimensions.Height, Width: farmStore.Dimensions.Width},},)}} placeholder="FarmName" />
                    <Label for="exampleSelect">Select</Label>
                      <Input type="select" onChange={(e) => {setFarmStore({Name:farmStore.Name,Description:farmStore.Description, Active: e.target.value, Dimensions: {Height:farmStore.Dimensions.Height, Width: farmStore.Dimensions.Width},},)}} name="select" id="exampleSelect">
                        <option>Active</option>
                        <option>Not Active</option>
                      </Input>
                      <Label for="exampleCity">Dimensions</Label>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Input placeholder="Height" onChange={(e) => {setFarmStore({Name: farmStore.Name,Description:farmStore.Description, Active: farmStore.Active, Dimensions: {Height:e.target.value, Width: farmStore.Dimensions.Width},},)}} type="text" name="city" id="exampleCity"/>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Input placeholder="Width" onChange={(e) => {setFarmStore({Name:farmStore.Name,Description:farmStore.Description, Active: farmStore.Active, Dimensions: {Height:farmStore.Dimensions.Height, Width: e.target.value},},)}} type="text" name="state" id="exampleState"/>
                          </FormGroup>
                        </Col>
                      </Row>
                              <Label for="exampleText">Description</Label>
                              <Input type="textarea" onChange={(e) => {setFarmStore({Name:farmStore.Name,Description:e.target.value, Active: farmStore.Active, Dimensions: {Height:farmStore.Dimensions.Height, Width: farmStore.Dimensions.Width},},)}} name="text" id="exampleText" />
                </FormGroup>
                <Button onClick={(e)=>{setFarmObj({CheckUpdate: true})}}>Add </Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Employee</CardTitle>
                <FormGroup>
                      <Input placeholder="UserName" onChange={(e) => { setUserName( e.target.value )}} />
                      <Label type="example">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={(e) => { setUserPassword( e.target.value ) }} />
                      <Label for="exampleSelect">Select a Role</Label>
                      <Input type="select" name="select" id="exampleSelect" onChange={(e) => { setUserRole(e.target.value ) }}>
                      <option>Customer</option>
                      <option>Employee</option>
                      <option>Manager</option>
                      <option>Admin</option>
                    </Input>
               </FormGroup>
                <Button onClick={(e) => {setUserObj({isUpdate: true})}}>Add</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
          {toastFarmVisible===true && (
          <Toast style={{position:"fixed", bottom:1+"em", right:1+"em", width:15+"em"}}>
              <ToastHeader icon="light">
               Reactstrap
               </ToastHeader>
              <ToastBody>
               Farm Created.
              </ToastBody>
          </Toast>)
          }
          {toastUserVisible===true && (
            <Toast style={{position:"fixed", bottom:30+"em", right:1+"em", width:15+"em"}}>
                <ToastHeader icon="light">
                 Reactstrap
                 </ToastHeader>
                <ToastBody>
                 User created.
                </ToastBody>
            </Toast>)
          }
    </div>
  );
}


export default Admin;