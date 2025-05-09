import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=30')
      .then(response => {
        const data = response.data.map(item => ({
          id: item.id,
          leyenda: item.title.slice(0, 20),
          imagen: item.thumbnailUrl
        }));
        setItems(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div className="contenedor">
      {items.map(item => (
        <a href={`/detalle/${item.id}`} key={item.id} className="vista">
          <img src={item.imagen} alt={item.leyenda} />
          <span>{item.leyenda}</span>
        </a>
      ))}
    </div>
  );
}

export default App;
