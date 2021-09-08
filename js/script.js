const region = {
    getall:'all',
    region:'region'
}

const RegionData = [
    {
        title:'all countries',
        route:'all'
    },
    {
        title:'Africa',
        route:'africa'
    },
    {
        title:'Americas',
        route:'americas'
    },
    {
        title:'Asia',
        route:'asia'
    },
    {
        title:'Europe',
        route:'europe'
    },
    {
        title:'Oceania',
        route:'oceania'
    }
]

const navcontainer = document.querySelector('.nav_container')
const container = document.querySelector('.row')

window.addEventListener('load' , ()=>{
 
    const nav  = RegionData.map(({title, route}) =>{
        return navList(title , route)
    }).join('')

   navcontainer.innerHTML = nav

    FetchData(region.getall , res =>{
        const card = res.map((item) =>{
            return Card(item)
        }).join('')

        container.innerHTML = card
    })


})

function navList(title , route){
    return `
        <li class ="nav-item">
            <button onclick = "chooseRegion('${route}')">${title}</button>
        </li>
    `
}
function chooseRegion(route){
    if(route == 'all'){
        FetchData(region.getall , res =>{
            const card = res.map((item) =>{
                return Card(item)
            }).join('')
    
            container.innerHTML = card
        })
    }else{
        FetchData(`${region.region}/${route}` , res =>{
            const card = res.map((item) =>{
                return Card(item)
            }).join('')
    
            container.innerHTML = card
        })
    }
}





function Card(item){
    return `
        <div class ="mycard">
            <div class = "cardd">
                <div class = "card-header">
                    <h1>${item.name}</h1>
                </div>
                <div class = "card-image">
                    <img src="${item.flag}">
                </div>
                <div class = "card-body">
                    <h1>Capital: ${item.capital}</h1>
                    <h1>Region: ${item.region}</h1>
                    <h1>Population:${item.population}</h1>
                    <h1>Subregion:${item.subregion}</h1>
                    <h1>Demonym:${item.demonym}</h1>
                    <h1>NativeName:${item.nativeName}
                    
                </div>
            </div>
        </div>
    `
}




function FetchData(endPoint , cb){
    fetch(`https://restcountries.eu/rest/v2/${endPoint}`)
    .then(res => res.json())
    .then(r => cb(r))
}



const select = document.querySelector('.select')
const search = document.querySelector('.search')

select.addEventListener('change' , e =>{
    let value = e.target.value

    if(value == 'capital'){
        search.setAttribute('placeholder' , 'Enter by Capital')
        search.classList.remove('green')
    }else{
        search.setAttribute('placeholder' , 'Enter by Country')
        search.classList.add('green')
    }
})

search.addEventListener('input' , e =>{
    var value = e.target.value.toUpperCase()

    if(select.value === 'capital'){
       FetchData(region.getall , res =>{
           const card = res.map(item =>{
                if(item.capital.toUpperCase().includes(value)){
                    return Card(item)
                }
           }).join('')
           container.innerHTML = card
       })
        
    }else{
        FetchData(region.getall , res =>{
            const card = res.map(item =>{
                 if(item.name.toUpperCase().includes(value)){
                     return Card(item)
                 }
            }).join('')

            container.innerHTML= card
        })
        
    }
})

