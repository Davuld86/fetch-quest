import React, { useEffect, useState } from 'react'
import CategoryLink from './CategoryLink';
import NoneFound from './NoneFound';

export default function AllCategories() {
    const[categories, setCategories] = useState(null)
    const[isLoaded, setLoaded] = useState(null)

    useEffect(() => {
        fetch('/api/categories/').then((r) => {
         if (r.ok) {
           r.json().then((categories) => setCategories(categories));
         }
         else{
             setCategories(0)
         }
       })
       setLoaded(true)
       }, []);
if(isLoaded){
    if(categories){
        return(
            <div>
                <h1>All Categories</h1>
                {categories.map((category)=><CategoryLink key={category.id} category={category}/>)}

            </div>
        )
    }
    if (categories==0){
        return (
             <NoneFound title={"Something's wrong"} image={'../images/no_category.png'} text={'No categories found!'}/>
  )
}
    }
}

