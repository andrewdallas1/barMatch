// function getLocation() {
//   if (navigator.geolocation) { // if your browser has a geolocation object
//       //dom manipulation stuff
//       navigator.geolocation.getCurrentPosition(patchPosition); // run the getCurrentPosition function, which takes a callback
//   } else {
//     console.log('no location'); // otherwise, nope
//   }
// }

// function patchPosition(position) { // this is the callback, takes an argument `position` as defined in the html5 spec
//   axios.patch('/', { // we're patching back to our own express backend so don't need to set a specific url
//                      // if you have an API route set up you can send to that also
//     lat: position.coords.latitude,
//     lng: position.coords.longitude
//   }).then((res) => {
//     console.log(res.data);
//     // the thing i was getting back from this request was a short weather forecast
//     // but you can send whatever you want and do whatever you want with it
//     // document.getElementById('ifresults').innerHTML = res.data;
//   }).catch((err) => console.log(err));
// }


// getLocation();
