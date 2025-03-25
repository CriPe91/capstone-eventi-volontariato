import { Container, Row, Col, Carousel, Card, Image } from "react-bootstrap";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      {/* Carosello di Immagini */}

      <Carousel>
        <Carousel.Item>
          <Image
            className="w-100 object-fit-cover"
            height={490}
            src="https://www.avveniredicalabria.it/wp-content/uploads/2021/04/volontari-del-sorriso-0.jpg"
            alt="Volontari giocano con i bambini"
          />
          <Carousel.Caption>
            <h2>Giochi e Intrattenimento</h2>
            <p className="text-light">Il gioco è una terapia potente che aiuta i bambini a sentirsi meno soli.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="w-100 object-fit-cover"
            height={490}
            src="https://cdn.prod.website-files.com/5e8af888eaf48714ca48963a/610b9bd850b073e4e7d4054c_assistente%20sociale-volontariato-ponte-umanizzazione-cure--.png"
            alt="Lettura di favole ai bambini"
          />
          <Carousel.Caption>
            <h2>Storie e Fantasia</h2>
            <p className="text-light">Un libro può trasportare un bambino in un mondo magico anche dal letto d’ospedale.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="w-100 object-fit-cover"
            height={490}
            src="https://teniamocipermanoonlus.net/wp-content/themes/yootheme/cache/4e/Associazione-di-Clownterapia-Teniamoci-Per-Mano-4e658853.jpeg"
            alt="Artisti e musica per i bambini"
          />
          <Carousel.Caption>
            <h2>Musica e Creatività</h2>
            <p className="text-light">La musica e il disegno aiutano a ridurre lo stress e a migliorare l'umore.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container fluid id="homepage-container" className="">
        {/* Titolo e Introduzione */}
        <Row id="homepage-title" className="text-center d-flex justify-content-center mb-5">
          <Col md={8}>
            <h1 className="fw-bold">“ Portiamo Sorrisi ai Bambini in Ospedale ”</h1>
            <p className="fs-5">
              Il nostro volontariato si dedica a regalare momenti di gioia e conforto ai bambini ricoverati, trasformando la loro degenza in un’esperienza più
              serena e meno spaventosa.
            </p>
          </Col>
        </Row>

        {/* Sezione di Sensibilizzazione*/}
        <Row id="homepage-info" className="p-5 text-center d-flex align-items-center justify-content-around">
          <Col xs={12} md={9} className="">
            <h3 className=" text-center mb-4">Il Volontariato che fa la Differenza</h3>
            <p className="text-center mb-3">
              Ogni anno, migliaia di bambini in Italia affrontano lunghi periodi di ricovero ospedaliero a causa di malattie gravi o trattamenti intensivi.
              Questo può risultare un'esperienza difficile, spesso segnata da paura, solitudine e stress. Tuttavia, un piccolo gesto di gentilezza può fare una
              grande differenza. Il volontariato ospedaliero aiuta a creare un ambiente più accogliente, trasformando i reparti pediatrici in luoghi di
              speranza, gioia e creatività.
            </p>
            <Image
              fluid
              className="rounded shadow-lg border border-3 border-light"
              width={500}
              src="https://assets.gazzettadelsud.it/2021/11/4a607f41-3eae-453d-9bc6-f0fae427b654.jpg"
            />
            <p className="text-center mt-3">
              I nostri volontari dedicano il loro tempo ai piccoli pazienti con attività ludiche, artistiche e di intrattenimento. Attraverso giochi, racconti,
              musica e momenti di socializzazione, offriamo ai bambini un'occasione per evadere, anche solo per un attimo, dalla loro realtà ospedaliera. Un
              sorriso, una storia raccontata, una risata condivisa possono rendere la degenza meno spaventosa e più umana.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image />
          </Col>
          <Col xs={12} md={4}>
            <h3 className=" text-end">Perchè diventare volontario? 🤝</h3>
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
            <Card id="col-custom-first" className="text-center p-3 shadow mb-xs-3 mb-sm-3 mb-md-3">
              <Card.Body>
                <Card.Title id="card-title-first">🎨 Laboratori Creativi</Card.Title>
                <Card.Text>
                  Disegno, pittura e lavoretti manuali per stimolare la creatività e offrire un momento di distrazione ai bambini in ospedale. Un'opportunità
                  per esprimersi, sviluppare il talento e vivere un’esperienza positiva.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card id="col-custom-second" className="text-center p-3 shadow mb-xs-3 mb-sm-3 mb-md-3">
              <Card.Body>
                <Card.Title id="card-title-second">📖 Racconti e Favole</Card.Title>
                <Card.Text>
                  Storie narrate dai volontari per trasportare i bambini in mondi fantastici, stimolare la loro immaginazione e aiutarli a dimenticare, anche
                  solo per un attimo, il contesto ospedaliero in cui si trovano.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card id="col-custom-third" className="text-center p-3 shadow mb-xs-3 mb-sm-3 mb-md-3">
              <Card.Body>
                <Card.Title id="card-title-third">🎭 Spettacoli e Animazione</Card.Title>
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
            <h3 className="text-primary">🌞 Pensieri che Ispirano 🌞</h3>
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
