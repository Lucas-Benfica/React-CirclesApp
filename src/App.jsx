import { useState } from 'react';
import './App.css';

function App() {
  const [circles, setCircles] = useState([]);
  const [undone, setUndone] = useState(null);

  function addCircle(event) {
    const { offsetX, offsetY } = event.nativeEvent;

    // Verificar se o clique ocorreu dentro de um círculo existente
    const isInsideCircle = circles.some(
      (circle) =>
        offsetX >= circle.x - 10 &&
        offsetX <= circle.x + 10 &&
        offsetY >= circle.y - 10 &&
        offsetY <= circle.y + 10
    );

    if (!isInsideCircle) {
      const newCircle = { x: offsetX, y: offsetY };
      setCircles([...circles, newCircle]);
      setUndone(null);
    }

    event.stopPropagation();
  }

  function undoCircle(event) {
    const updatedCircles = [...circles];
    if (updatedCircles.length > 0) {
      const lastUndone = updatedCircles.pop();
      setUndone(lastUndone);
      setCircles(updatedCircles);
    }
    event.stopPropagation();
  }

  function redoCircle(event) {
    if (undone) {
      setCircles([...circles, undone]);
      setUndone(null);
    }
    event.stopPropagation();
  }

  return (
    <div className="App" onClick={addCircle}>
      {circles.map((circle, index) => (
        <div
          key={index}
          className="circle"
          style={{ left: circle.x, top: circle.y }}
          onClick={(e) => e.stopPropagation()}
        ></div>
      ))}
      <div className="button-container">
        <button onClick={undoCircle}>Desfazer</button>
        <button onClick={redoCircle}>Refazer</button>
      </div>
    </div>
  );
}

export default App;
