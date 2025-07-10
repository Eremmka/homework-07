import './Locations.css';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useSearchInfo } from '../../shared';
import { LoadingComponent } from '../../shared';

export default function Locations() {
  const observer = useRef();
  const { 
    data: locationsData = [],
    loading,
    error,
    hasMore
  } = useSearchInfo('https://rickandmortyapi.com/api/location');
  
  const lastNodeRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  if (error) {
    return <div>Error loading data</div>;
  }
  console.log(loading)
  return (
    <section className='first-section-locations'>
      <h1>Локации Мультфильма</h1>
      <div className='locations-section-grid'>
        {locationsData.map((location, index) => (
          <Link to={`${location.id}`} key={location.id}>
            {locationsData.length - 20 === index + 1 ? (
              <div ref={lastNodeRef} className='locations-card'>
                <h4>Номер локации: {location.id}</h4>
                {location.name}
              </div>
            ) : (
              <div className='locations-card'>
                <h4>Номер локации: {location.id}</h4>
                {location.name}
              </div>
            )}
          </Link>
        ))}
      </div>
      {loading && <LoadingComponent/>}
    </section>
  );
}