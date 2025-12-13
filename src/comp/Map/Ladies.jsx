import React from 'react'
import MapComp from '../Func/MapComp'

export default function Ladies() {
  return (
       <MapComp src={['/assets/map/ladies.jpeg'  , '/assets/map/ladies1.jpeg' ,]} alt="oopps:(">
  <ul className='list-disc '>
     <p>"We’ve provided a sufficient number of lockers, carefully distributed to suit the gym’s layout. Our team ensures 24/7 cleanliness to maintain your comfort and hygiene at all times."</p>
  </ul>
</MapComp>
  )
}
