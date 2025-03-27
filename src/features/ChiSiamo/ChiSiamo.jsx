import { Container, Row, Col, Image, Card, Button, Carousel } from "react-bootstrap";
import { People, Heart, ChatDots, Stars, Envelope } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../ChiSiamo/ChiSiamoCss.css";

const ChiSiamo = () => {
  return (
    <Container fluid id="chi-container">
      {/* Titolo e paragrafo introduttivo */}
      <Row id="chi-title" className="text-center py-2">
        <Col lg={8} className="mx-auto">
          <h1 className="fw-bold">Chi Siamo</h1>
          <p className="fs-5 mt-4">
            Siamo una comunità di volontari uniti dalla convinzione che un gesto gentile possa fare la differenza nella vita di un bambino. Il nostro progetto,{" "}
            <strong>GIVE JOY</strong>, nasce dal desiderio di portare sollievo, sorrisi e umanità all’interno degli ospedali pediatrici. Crediamo che il tempo
            dedicato all'ascolto, al gioco, alla creatività e alla presenza affettuosa possa trasformare anche i momenti più difficili in esperienze di
            connessione e speranza. Ogni giorno, ci impegniamo a colorare il grigio della degenza con attività pensate per alleviare la solitudine e accendere
            la fantasia. Siamo convinti che la vera cura inizi anche da un sorriso condiviso.
          </p>
        </Col>
      </Row>

      {/* Loghi */}
      <Row xs={1} sm={2} md={2} lg={4} className="justify-content-around text-center mb-4 mt-5 bg-dark align-items-center py-2">
        <Col>
          <Image src="/src/assets/logo_regione.jpg" alt="Logo Regione Lazio" width={180} fluid className="rounded" />
        </Col>
        <Col>
          <Image src="/src/assets/logo_medical.gif" alt="Logo medical joy" width={180} fluid />
        </Col>
        <Col>
          <Image src="/src/assets/logo_associato.gif" alt="Logo associato" width={180} fluid />
        </Col>
        <Col>
          <Image src="/src/assets/Stemma_Provincia.jpg" alt="Logo prov roma" width={180} fluid className="rounded" />
        </Col>
      </Row>

      {/* Missione */}
      <Row id="chi-missione" className="align-items-center px-3 py-5">
        <Col xs={12} md={6} className="mb-4 mb-md-0 d-flex justify-content-center">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Image
              src="https://www.italiachecambia.org/wp-content/uploads/2022/11/277747919_10228564569485586_5528426130298725898_n-1024x681.jpg"
              alt="Volontari con bambini"
              fluid
              className="rounded shadow-lg border border-light"
            />
          </div>
        </Col>
        <Col md={6}>
          <h3 className="mb-3">La nostra missione</h3>
          <p>
            La nostra missione nasce da un’idea semplice, ma potente: <strong>portare gioia là dove ce n’è più bisogno</strong>. In un ambiente come l’ospedale,
            spesso percepito come freddo e spaventoso, ci impegniamo ogni giorno a costruire spazi di umanità, calore e leggerezza.
          </p>
          <p>
            I bambini ricoverati affrontano sfide difficili e, a volte, troppo grandi per la loro età. Noi vogliamo essere una presenza amica, capace di
            trasformare un pomeriggio qualunque in un momento speciale, fatto di gioco, racconti e sorrisi condivisi.
          </p>
          <p>
            Non ci proponiamo di curare nel senso medico del termine, ma di <strong>curare le emozioni</strong>, ridurre la solitudine e sostenere le famiglie
            nel percorso. Attraverso attività creative, animazione e ascolto autentico, vogliamo regalare ai piccoli pazienti{" "}
            <strong>un tempo di leggerezza</strong>, dove possano sentirsi semplicemente bambini.
          </p>
          <p>
            È proprio da questo desiderio che nasce <strong>GIVE JOY</strong>: un invito a donare gioia, attenzione e presenza reale, con il cuore aperto e lo
            sguardo gentile.
          </p>
        </Col>
      </Row>

      {/* Carosello citazioni missione */}
      <Row className="justify-content-center px-3 pb-5">
        <Col md={10}>
          <Carousel indicators={false} controls={true} interval={5000} className="mt-4">
            <Carousel.Item>
              <p className="fst-italic text-center  fs-5">
                "A volte basta un sorriso, un gesto gentile, una presenza silenziosa per cambiare il mondo di qualcuno."
                <br />
                <span className="fw-light">– Anonimo</span>
              </p>
            </Carousel.Item>
            <Carousel.Item>
              <p className="fst-italic text-center  fs-5">
                "La gioia non è nelle cose: è dentro di noi e nei legami che creiamo con gli altri."
                <br />
                <span className="fw-light">– Madre Teresa di Calcutta</span>
              </p>
            </Carousel.Item>
            <Carousel.Item>
              <p className="fst-italic text-center  fs-5">
                "Nessun gesto di gentilezza, per quanto piccolo, è mai sprecato."
                <br />
                <span className="fw-light">– Esopo</span>
              </p>
            </Carousel.Item>
            <Carousel.Item>
              <p className="fst-italic text-center  fs-5">
                "Chi dona con il cuore non perde mai nulla: semina umanità."
                <br />
                <span className="fw-light">– Anonimo</span>
              </p>
            </Carousel.Item>
            <Carousel.Item>
              <p className="fst-italic text-center  fs-5">
                "Un sorriso è la curva che può raddrizzare tante cose."
                <br />
                <span className="fw-light">– Phyllis Diller</span>
              </p>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      {/* Valori */}
      <Row id="chi-valori" className="text-center px-3 py-2 mb-3">
        <Col>
          <h3>I nostri valori</h3>
        </Col>
        <Row className="mt-4 g-4 justify-content-center">
          <Col xs={12} sm={6} md={3}>
            <Card className="p-3 card-valore h-100">
              <Heart size={32} />
              <h5 className="mt-3 fw-bold">Empatia</h5>
              <p>Ci mettiamo nei panni degli altri con cuore e rispetto.</p>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="p-3 card-valore h-100">
              <ChatDots size={32} />
              <h5 className="mt-3 fw-bold">Ascolto</h5>
              <p>Ogni storia merita attenzione, ogni voce ha valore.</p>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="p-3 card-valore h-100">
              <Stars size={32} />
              <h5 className="mt-3 fw-bold">Gioia</h5>
              <p>Il sorriso di un bambino è il nostro premio più grande.</p>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className="p-3 card-valore h-100">
              <People size={32} />
              <h5 className="mt-3 fw-bold">Comunità</h5>
              <p>Insieme possiamo fare la differenza, ogni giorno.</p>
            </Card>
          </Col>
        </Row>
      </Row>

      {/* Contatti GIVE JOY */}
      <Row id="chi-contatti" className="text-center py-5 px-3">
        <Col md={8} className="mx-auto">
          <h3>Contatta la community GIVE JOY</h3>
          <p className="mb-2 mt-4 fw-bold fs-5">Hai domande? Vuoi collaborare? Contattaci senza impegno!</p>
          <p>
            <Envelope className="me-2" />
            <strong>Email:</strong> givejoy.volontari@gmail.com
          </p>
          <p>
            <strong>Sede operativa:</strong> Roma, Via dei Bambini Felici, 123
          </p>
        </Col>
      </Row>

      {/* Call to Action */}
      <Row id="chi-unisciti" className="text-center py-3 px-3">
        <Col md={8} className="mx-auto">
          <h3 className="text-light">Vuoi unirti a noi?</h3>
          <p className="mb-3 fs-5 mt-3">
            Diventa volontario e porta anche tu un sorriso in corsia. Non servono competenze specifiche, solo cuore e voglia di esserci.
          </p>
          <Button as={Link} to="/eventi" variant="outline-primary" className="fw-semibold">
            Scopri come partecipare
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChiSiamo;
