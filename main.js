async function getUsers(numberOfUsers) {
    const data = await fetch(`https://randomuser.me/api?results=${numberOfUsers}`)

    return await data.json();
}

async function getCountries() {
    const data = await fetch(`https://restcountries.eu/rest/v2/all`)

    return await data.json();
}

async function showUsers(numberOfUsers) {
    const users = await getUsers(numberOfUsers);
    const countries = await getCountries(); // lista de tari si capitale

    users.results.forEach((user) => {
        let country = user.location.country; //tara user
        let city = user.location.city;
        let lat1 = user.location.coordinates.latitude;
        let lon1 = user.location.coordinates.longitude;
        let lat2;
        let lon2;

        countries.forEach((state) => {
            if(state.name == country){
                lat2 = state.latlng[0];
                lon2 = state.latlng[1];
            }
        })

        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return d;
        }

        function deg2rad(deg) {
        return deg * (Math.PI/180)
        }

        distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

        console.log(`Salut, eu sunt ${user.name.title} ${user.name.first}-${user.name.last} si sunt din
         ${city}, ${country}. Coordonatele orasului sunt: ${lat1} latitudine, ${lon1} longitudine. Coordonatele 
        capitalei: ${lat2}, ${lon2}. Distanta dintre cele 2 locatii este de ${distance} km.`);

    })
}

showUsers(3);