//@ts-check
import Carousel from 'react-bootstrap/Carousel'

export default function Carouse(){
    return(
    <Carousel style={{marginTop:'-20px'}}>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="../../assets/img/nuruttaqwa.jpg"
                alt="First slide"
                style={{height: 450}}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="../../assets/img/book-stack-3964568_1920.jpg"
                alt="Second slide"
                style={{height: 450}}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="../../assets/img/education-3571630.jpg"
                alt="Third slide"
                style={{height: 450}}
                />
             </Carousel.Item>
    </Carousel>
   
    )
    
}
