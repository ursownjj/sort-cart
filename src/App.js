import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VisualizerController from './VisualizerController';
import SortingVisualizer from './SortingVisualizer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      default: {
        sortingAlgorithm: 'quicksort',
        size: '15',
        speed: 'Fast',
        barColor: 'Blue',
        pointerColor: 'Red',
        sortedColor: 'Green',
        sort: false,
        randomize: true,
      },
      sorted: false,
    };
  }

  controllerDataHandler = (e) => {
    this.setState(
      {
        default: {
          ...e,
          sorted: false,
        },
      },
      () => {
        if (e.sort) {
          const element = document.getElementById('sortingVisualizer');
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    );
  };

  visualizerDataHandler = (e) => {
    this.setState({ sorted: e });
  };

  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <p style={{ color: 'white' }}></p>
            </Col>
          </Row>
          <Row xl={2} lg={2} md={2} sm={1} xs={1}>
            <Col xl={4} lg={4} md={4}>
              <VisualizerController
                controllerDataHandler={this.controllerDataHandler}
                visualizerData={this.state.sorted}
              >
                {this.state.sorted}
              </VisualizerController>
            </Col>
            <Col id="sortingVisualizer">
              <SortingVisualizer
                visualizerDataHandler={this.visualizerDataHandler}
                controllerData={this.state.default}
              />
            </Col>
          </Row>
          <Row xl={1} lg={1} md={1} sm={1} xs={1}>
            <Col>
              <h6>Developed By : Joshva & Team</h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;