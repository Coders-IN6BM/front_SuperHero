import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleItemClick = (item) => {
    axios.get(`https://jsonplaceholder.typicode.com/photos/${item.id}`)
      .then(response => {
        setSelectedItem(response.data);
        setShowPopup(true);
      })
      .catch(error => {
        console.error('Error al obtener detalles del ítem:', error);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  return (
    <div className="contenedor">
      {items.map(item => (
        <a href="#" key={item.id} className="vista" onClick={() => handleItemClick(item)}>
          <img src={item.imagen} alt={item.leyenda} />
          <span>{item.leyenda}</span>
        </a>
      ))}

      {showPopup && selectedItem && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&#10006;</span>
            <div className="popup-image">
              <img src={selectedItem.thumbnailUrl} alt={selectedItem.title} />
            </div>
            <h2>Detalles del ítem</h2>
            <p><strong>ID:</strong> {selectedItem.id}</p>
            <p><strong>Name:</strong> {selectedItem.title}</p>
            <p><strong>Aliases:</strong> <a href={selectedItem.url} target="_blank" rel="noopener noreferrer">{selectedItem.url}</a></p>
            <p><strong>Power:</strong> {selectedItem.albumId}</p>
            <p><strong>Birth Name:</strong> {selectedItem.dateCreated || 'N/A'}</p>
            <p><strong>gender:</strong> {selectedItem.description || 'No disponible'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
