import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import { Container, Row, Col, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import profileImg1 from "../images/chetan.jpg";
import profileImg2 from "../images/om.jpeg";
import profileImg3 from "../images/atharv.jpeg";
import profileImg4 from "../images/asmita.jpeg";
import profileImg5 from "../images/prajakta.jpeg";

initMDB({ Dropdown, Collapse });

function AboutUsPage() {

    const renderTooltip = (email) => (
        <Tooltip id="email-tooltip">{email}</Tooltip>
    );

    return (
        <div>
            <Navbar />
            <Container className="my-5">
                <div className="p-5 bg-light rounded-3 shadow-lg">
                    <Row className="mb-5 text-center">
                        <Col xs={12}>
                            <h1 className="mb-4 fw-bold text-uppercase animate__animated animate__fadeInDown" style={{ fontSize: '3rem', textDecoration: 'underline', color: 'black' }}>
                                About Us
                            </h1>
                            <p className="lead text-secondary animate__animated animate__fadeIn animate__delay-1s">
                                Welcome to <span className="text-dark fw-bold">ElectroZone</span>, your go-to destination for quality electronics! Our mission is to provide a smooth and enjoyable shopping experience, featuring a broad selection of electronic products from top brands.
                            </p>
                            <p className="text-muted animate__animated animate__fadeIn animate__delay-2s">
                                At <span className="text-dark fw-bold">ElectroZone</span>, we focus on offering a user-friendly interface, secure payment methods, and a diverse range of products, from the latest gadgets to essential home electronics. Our platform is designed to help you find exactly what you need effortlessly.
                            </p>
                            <div className="my-4 bg-white p-4 rounded-3 shadow-sm animate__animated animate__zoomIn">
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <div className="p-3 bg-info text-white rounded-3 shadow-sm">
                                            <h3 className="fw-bold">Our Values</h3>
                                            <p>
                                                We are committed to excellence, integrity, and customer satisfaction. Our dedicated team ensures that every aspect of our service meets the highest standards.
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <div className="p-3 bg-light text-dark rounded-3 shadow-sm">
                                            <h3 className="fw-bold">Innovation</h3>
                                            <p>
                                                We stay up-to-date with the latest technologies to provide you with a modern and innovative shopping experience. Look out for regular updates and new features!
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <p className="text-muted animate__animated animate__fadeIn animate__delay-3s">
                                Our team of talented developers is dedicated to continuously improving our platform, making it more intuitive and user-friendly. We welcome your feedback and are always eager to hear from you to enhance our service.
                            </p>
                        </Col>
                    </Row>
                    <h1 className="text-center mb-4 fw-bold text-uppercase animate__animated animate__fadeInUp" style={{ fontSize: '3rem', textDecoration: 'underline', color: 'black' }}>Our Team</h1>
                    <Row className="justify-content-center text-center">
                        {[{
                            name: 'Atharva Narkhede',
                            img: profileImg3,
                            LinkedIn: 'https://www.linkedin.com/in/atharva-narkhede-644a521b1',
                            github: 'https://github.com/imatharv10/',
                            email: 'anarkhedeatharva00@gmail.com'
                        }, {
                            name: 'Chetan Sonawane',
                            img: profileImg1,
                            LinkedIn: 'https://www.linkedin.com/in/chetan-sonawane21/',
                            github: 'https://github.com/ChetanSonawane07/',
                            email: 'sonawanechetan2002@gmail.com'
                        }, {
                            name: 'Om Kshirsagar',
                            img: profileImg2,
                            LinkedIn: 'https://www.linkedin.com/in/om-kshirsagar-a72053203/',
                            github: 'https://github.com/omkshirsagar07',
                            email: 'omkshirsagar055@gmail.com'
                        }, {
                            name: 'Asmita Patil',
                            img: profileImg4,
                            LinkedIn: 'https://www.linkedin.com/in/asmita2023',
                            github: 'https://github.com/asmitapatil3003',
                            email: 'asmitap941@gmail.com@gmail.com'
                        }, {
                            name: 'Prajakta Magar',
                            img: profileImg5,
                            LinkedIn: "https://www.linkedin.com/in/prajaktamagar",
                            github: 'https://github.com/Prajaktam06',
                            email: 'prajaktam06.comp@gmail.com'
                        }].map((member, index) => (
                            <Col key={index} md={4} lg={2} className="mb-4 d-flex justify-content-center">
                                <Card className="text-center shadow-lg border-light team-card animate__animated animate__zoomIn" style={{ width: '18rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={member.img}
                                        className="rounded-circle mx-auto mt-3"
                                        style={{ width: '8rem', height: '8rem', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{member.name}</Card.Title>
                                        <Card.Text>Developer</Card.Text>
                                        <div className="d-flex justify-content-center">
                                            {member.LinkedIn && <a href={member.LinkedIn} target="_blank" rel="noopener noreferrer" className="text-dark me-2"><i className="fab fa-linkedin fa-lg"></i></a>}
                                            {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-dark me-2"><i className="fab fa-github fa-lg"></i></a>}
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={renderTooltip(member.email)}
                                            >
                                                <a href="#" onClick={(e) => e.preventDefault()} className="text-dark"><i className="fas fa-envelope fa-lg"></i></a>
                                            </OverlayTrigger>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
            <Footer />
            <style jsx>{`
                .team-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .team-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }
                .bg-info {
                    background: linear-gradient(90deg, rgba(33, 147, 176, 1) 0%, rgba(109, 213, 237, 1) 100%);
                }
                .bg-light {
                    background: #f9f9f9;
                }
                .text-dark {
                    color: #333 !important;
                }
                a {
                    transition: color 0.3s ease;
                }
                a:hover {
                    color: #007bff !important;
                }
            `}</style>
        </div>
    );
};

export default AboutUsPage;
