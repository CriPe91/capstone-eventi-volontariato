import { Container, Row, Col, Carousel, Card, Image } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
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
      </Container>

      {/* Carosello di Immagini */}

      <Container fluid>
        <Row xs={1} id="homepage-carousel" className="mt-4">
          <Col>
            <Carousel>
              <Carousel.Item>
                <Image
                  className="w-100 object-fit-cover"
                  height={550}
                  src="https://www.avveniredicalabria.it/wp-content/uploads/2021/04/volontari-del-sorriso-0.jpg"
                  alt="Volontari giocano con i bambini"
                />
                <Carousel.Caption>
                  <h3>Giochi e Intrattenimento</h3>
                  <p>Il gioco è una terapia potente che aiuta i bambini a sentirsi meno soli.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="w-100 object-fit-cover"
                  height={550}
                  src="https://cdn.prod.website-files.com/5e8af888eaf48714ca48963a/610b9bd850b073e4e7d4054c_assistente%20sociale-volontariato-ponte-umanizzazione-cure--.png"
                  alt="Lettura di favole ai bambini"
                />
                <Carousel.Caption>
                  <h3>Storie e Fantasia</h3>
                  <p>Un libro può trasportare un bambino in un mondo magico anche dal letto d’ospedale.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="w-100 object-fit-cover"
                  height={550}
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
      </Container>

      <Container className="mt-5">
        {/* Sezione di Sensibilizzazione*/}
        <Row id="homepage-info" className="text-center">
          <Col xs={12} md={6}>
            <h3 className="text-primary text-start">🌟 Il Volontariato che fa la Differenza</h3>
            <p className="text-start">
              Ogni anno, migliaia di bambini in Italia affrontano lunghi periodi di ricovero ospedaliero a causa di malattie gravi o trattamenti intensivi.
              Questo può risultare un'esperienza difficile, spesso segnata da paura, solitudine e stress. Tuttavia, un piccolo gesto di gentilezza può fare una
              grande differenza. Il volontariato ospedaliero aiuta a creare un ambiente più accogliente, trasformando i reparti pediatrici in luoghi di
              speranza, gioia e creatività.
            </p>
            <p className="text-start">
              I nostri volontari dedicano il loro tempo ai piccoli pazienti con attività ludiche, artistiche e di intrattenimento. Attraverso giochi, racconti,
              musica e momenti di socializzazione, offriamo ai bambini un'occasione per evadere, anche solo per un attimo, dalla loro realtà ospedaliera. Un
              sorriso, una storia raccontata, una risata condivisa possono rendere la degenza meno spaventosa e più umana.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <h3 className="text-primary text-end">Perchè diventare volontario? 🤝</h3>
            <p className="text-end">
              Diventare volontario è un'esperienza straordinaria e arricchente, che permette di portare sollievo e speranza a chi ne ha più bisogno. La nostra
              organizzazione accoglie chiunque abbia voglia di donare il proprio tempo e la propria energia per fare la differenza. Non servono competenze
              specifiche: basta il desiderio di aiutare e la volontà di ascoltare.
            </p>
            <p className="text-end">
              Organizziamo eventi speciali, laboratori creativi, spettacoli di magia, letture animate e tante altre attività per rendere il soggiorno in
              ospedale un’esperienza più leggera. Ogni volontario diventa parte di una grande famiglia che condivide l’obiettivo comune di portare gioia ai
              bambini in difficoltà. La solidarietà, il rispetto e l’empatia sono i valori fondamentali che guidano ogni nostra iniziativa.
            </p>
          </Col>
        </Row>

        {/* Card Informative */}
        <Row id="homepage-cards" className="mt-5 text-center">
          <Col xs={12} md={4}>
            <Card className="text-center p-3 shadow">
              <Card.Body>
                <Card.Title className="text-primary">🎨 Laboratori Creativi</Card.Title>
                <Card.Text>
                  Disegno, pittura e lavoretti manuali per stimolare la creatività e offrire un momento di distrazione ai bambini in ospedale. Un'opportunità
                  per esprimersi, sviluppare il talento e vivere un’esperienza positiva.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="text-center p-3 shadow">
              <Card.Body>
                <Card.Title className="text-primary">📖 Racconti e Favole</Card.Title>
                <Card.Text>
                  Storie narrate dai volontari per trasportare i bambini in mondi fantastici, stimolare la loro immaginazione e aiutarli a dimenticare, anche
                  solo per un attimo, il contesto ospedaliero in cui si trovano.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="text-center p-3 shadow">
              <Card.Body>
                <Card.Title className="text-primary">🎭 Spettacoli e Animazione</Card.Title>
                <Card.Text>
                  Clown, Super Eroi e magia per regalare sorrisi e momenti di leggerezza ai piccoli pazienti. L’allegria e il gioco diventano strumenti
                  terapeutici capaci di migliorare l’umore e ridurre la paura del contesto medico.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Citazioni e Aforismi Motivazionali */}
        <Row id="homepage-quotes" className="mt-5 text-center">
          <Col>
            <h2 className="text-primary">🌞 Pensieri che Ispirano 🌞</h2>
            <Carousel indicators={false} controls={false} className="mt-3 w-50 mx-auto">
              <Carousel.Item>
                <Card className="text-center p-3">
                  <Card.Body>
                    <Card.Text className="fs-6 fst-italic">"Un bambino che sorride è un bambino che sta guarendo dentro e fuori."</Card.Text>
                    <Card.Footer className="blockquote-footer">Anonimo</Card.Footer>
                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="text-center p-3">
                  <Card.Body>
                    <Card.Text className="fs-6 fst-italic">"La gentilezza è una medicina che non ha effetti collaterali."</Card.Text>
                    <Card.Footer className="blockquote-footer">Albert Schweitzer</Card.Footer>
                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="text-center p-3">
                  <Card.Body>
                    <Card.Text className="fs-6 fst-italic">"Se puoi fare una sola cosa oggi, falla con amore."</Card.Text>
                    <Card.Footer className="blockquote-footer">Madre Teresa di Calcutta</Card.Footer>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
