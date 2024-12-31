import {useState, useEffect  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col,Card } from "react-bootstrap";

 function LiveData(){
    const [mydata,setData]=useState([]);
    const api =()=>{
        fetch("https://inshorts.vercel.app/news/top")
        .then((response)=>response.json())
        .then((json)=>{
            setData(json.data.articles)
        });
    }; 

    useEffect(()=>{
        api();
        const interval=setInterval(() => {
            api();
        }, 20000)
        return ()=>clearInterval(interval);
    },[]);

    return(
        <>
        <Container fluid>
            <Row xs={1} md={3} className="g-4">
                {
                    mydata.map(
                        (res)=>{
                            return(
                               <>
                               <Col className="container-fluid mt-4">
                                <Card>
                                    <Card.Img variant="top" src={res.imageUrl} height="200px"/>
                                    <Card.Body>
                                        <Card.Title>{res.title}</Card.Title>
                                        <Card.Text>{res.content}</Card.Text>
                                    </Card.Body>
                                  
                                </Card>
                                </Col>
                               </>
                               )
                            }
                        )
                    }           
        
         </Row>
        </Container>    
   </> )
                           
}
export default LiveData;