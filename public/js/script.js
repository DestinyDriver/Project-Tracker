let socket =io();



if(navigator.geolocation){

    navigator.geolocation.watchPosition((pos)=>{
        const { latitude: lat, longitude: long } = pos.coords;
        

        socket.emit("send-location",{lat,long});
    },(err)=>{

        console.log(err);
        
    },{
        enableHighAccuracy:true,
        maximumAge:0,timeout:5000,
    });
}

const map=L.map("map").setView([0,0],15);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: '© DestinyDriver'
}).addTo(map);

const marker={

};

socket.on("rec-location",(data)=>{
    const {id,lat,long}=data;
    map.setView([lat,long]);

    if(marker[id]){
        marker[id].setLatLng([lat,long]);
    }else{
        marker[id]=L.marker([lat,long]).addTo(map);
    }
    
})

socket.on("user-dis",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id];
    }
})

setInterval(()=>{console.log(Object.keys(marker).length);},2000);



