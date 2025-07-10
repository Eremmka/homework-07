import { useParams } from 'react-router-dom';
import './InfoComponent.css';
import episodesData from '../../../entities/episode/episode.json';
import heroesData from '../../../entities/character/characters.json';
import locationsData from '../../../entities/location/location.json';



export default function InfoComponent ({ category }) {
  const { id } = useParams();
  const contentData = (() => {
    switch(category) {
      case 'episodes':
        return episodesData.find(item => item.id.toString() === id);
      case 'heroes':
        return heroesData.find(item => item.id.toString() === id);
      case 'locations':
        return locationsData.find(item => item.id.toString() === id);
      default:
        return null;
    }
  })();

  if (!contentData) {
    return (
      <div className="info-component">
        <div>
          <p>Данные не найдены</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="info-component">
      <div className="info-modal-window__infoCard">
        <h1>{contentData.name}</h1>
        <h2>Номер: {contentData.id}</h2>

        {category === 'episodes' && (
          <>
            <p>Дата выхода: {contentData.air_date}</p>
            <p>Эпизод: {contentData.episode}</p>
          </>
        )}

        {category === 'heroes' && (
          <>
            <img src={contentData.image} alt={contentData.name} />
            <p>Статус: {contentData.status}</p>
            <p>Вид: {contentData.species}</p>
          </>
        )}

        {category === 'locations' && (
          <>
            <p>Тип: {contentData.type}</p>
            <p>Измерение: {contentData.dimension}</p>
          </>
        )}
      </div>
    </div>
  );
}