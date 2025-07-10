import './Heroes.css';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSearchInfo } from '../../shared'
import { LoadingComponent } from '../../shared';

export default function Heroes() {
  const observer = useRef();
  const { 
    data: heroesData = [],
    loading,
    error,
    hasMore
  } = useSearchInfo('https://rickandmortyapi.com/api/character');
  
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

  return (
    <section className='first-section-heroes'>
      {loading && <div>Loading...</div>}
      <h1>Локации Мультфильма</h1>
      <div className='heroes-section-grid'>
        {heroesData.map((hero, index) => (
          <Link to={`${hero.id}`} key={hero.id}>
            {heroesData.length - 20 === index + 1 ? (
              <div ref={lastNodeRef} className='hero-card'>
                {hero.name}
                <img src={hero.image} alt='heroImage' />
              </div>
            ) : (
              <div className='hero-card'>
                {hero.name}
                <img src={hero.image} alt='heroImage' />
              </div>
            )}
          </Link>
        ))}
      </div>
      {loading && <LoadingComponent/>}
    </section>
    
  );
}