import { Container, Row, Col, Carousel, Card } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container id="homepage-container" className="mt-5">
      {/* Titolo e Introduzione */}
      <Row id="homepage-title" className="text-center">
        <Col>
          <h1 className="fw-bold text-primary">Portiamo Sorrisi ai Bambini in Ospedale</h1>
          <p className="fs-5">
            Il nostro volontariato si dedica a regalare momenti di gioia e conforto ai bambini ricoverati, trasformando la loro degenza in un’esperienza più
            serena e meno spaventosa.
          </p>
        </Col>
      </Row>

      {/* Carosello di Immagini */}
      <Row xs={1} md={2} id="homepage-carousel" className="justify-content-center mt-4">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block"
                width={500}
                src="https://www.avveniredicalabria.it/wp-content/uploads/2021/04/volontari-del-sorriso-0.jpg"
                alt="Volontari giocano con i bambini"
              />
              <Carousel.Caption>
                <h3>Giochi e Intrattenimento</h3>
                <p>Il gioco è una terapia potente che aiuta i bambini a sentirsi meno soli.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                width={500}
                src="https://cdn.prod.website-files.com/5e8af888eaf48714ca48963a/610b9bd850b073e4e7d4054c_assistente%20sociale-volontariato-ponte-umanizzazione-cure--.png"
                alt="Lettura di favole ai bambini"
              />
              <Carousel.Caption>
                <h3>Storie e Fantasia</h3>
                <p>Un libro può trasportare un bambino in un mondo magico anche dal letto d’ospedale.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                width={500}
                src="https://teniamocipermanoonlus.net/wp-content/themes/yootheme/cache/4e/Associazione-di-Clownterapia-Teniamoci-Per-Mano-4e658853.jpeg"
                alt="Artisti e musica per i bambini"
              />
              <Carousel.Caption>
                <h3>Musica e Creatività</h3>
                <p>La musica e il disegno aiutano a ridurre lo stress e a migliorare l'umore.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      {/* Sezione di Sensibilizzazione */}
      <Row id="homepage-info" className="mt-5 text-center">
        <Col xs={12} md={6}>
          <h2 className="text-primary">Perché è Importante?</h2>
          <p>
            Per un bambino, l’ospedale può sembrare un luogo freddo e spaventoso. Il volontariato ospedaliero aiuta a creare un ambiente più accogliente,
            favorendo il recupero attraverso il gioco e il contatto umano.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <h2 className="text-primary">Come Funziona?</h2>
          <p>
            Organizziamo eventi, letture di favole, spettacoli e momenti di gioco per i piccoli pazienti. Ognuno può contribuire in base alle proprie capacità e
            passioni!
          </p>
        </Col>
      </Row>

      {/* Card Informative */}
      <Row id="homepage-cards" className="mt-5">
        <Col xs={12} md={4}>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title className="text-primary">🎨 Laboratori Creativi</Card.Title>
              <Card.Text>Disegno, pittura e lavoretti manuali per stimolare la creatività e offrire un momento di distrazione.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title className="text-primary">📖 Racconti e Favole</Card.Title>
              <Card.Text>Storie raccontate dai volontari per trasportare i bambini in mondi magici e far volare la fantasia.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title className="text-primary">🎭 Spettacoli e Animazione</Card.Title>
              <Card.Text>Clown, burattini e magia per strappare un sorriso ai bambini nei momenti più difficili.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Citazioni e Aforismi Motivazionali */}
      <Row id="homepage-quotes" className="mt-5">
        <Col>
          <h2 className="text-center text-primary">Le Parole che ci Ispirano</h2>
          <Carousel className="mt-3">
            <Carousel.Item>
              <Card className="text-center p-4">
                <Card.Body>
                  <Card.Text className="fs-5">"Un bambino che sorride è un bambino che sta guarendo dentro e fuori."</Card.Text>
                  <Card.Footer className="blockquote-footer">Anonimo</Card.Footer>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className="text-center p-4">
                <Card.Body>
                  <Card.Text className="fs-5">"La gentilezza è una medicina che non ha effetti collaterali."</Card.Text>
                  <Card.Footer className="blockquote-footer">Albert Schweitzer</Card.Footer>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className="text-center p-4">
                <Card.Body>
                  <Card.Text className="fs-5">"Se puoi fare una sola cosa oggi, falla con amore."</Card.Text>
                  <Card.Footer className="blockquote-footer">Madre Teresa di Calcutta</Card.Footer>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
