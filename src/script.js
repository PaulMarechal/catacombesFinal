import './style.css';
import * as Scroll from './scroll.js';
import * as ImplementationRooms from './implementationRooms.js'
import * as RoomGen from './roomGen.js';
// import * as MobileNavigation from './mobileNavigation.js';
// import * as WidthVR from './widthVR.js';
import $ from 'jquery'; 

/*
Developed with 🍔 by 
     ___           ___           ___           ___                ___           ___           ___           ___           ___           ___           ___           ___  
    /\  \         /\  \         /\__\         /\__\              /\__\         /\  \         /\  \         /\  \         /\  \         /\__\         /\  \         /\__\ 
   /::\  \       /::\  \       /:/  /        /:/  /             /::|  |       /::\  \       /::\  \       /::\  \       /::\  \       /:/  /        /::\  \       /:/  / 
  /:/\:\  \     /:/\:\  \     /:/  /        /:/  /             /:|:|  |      /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/__/        /:/\:\  \     /:/  /  
 /::\~\:\  \   /::\~\:\  \   /:/  /  ___   /:/  /             /:/|:|__|__   /::\~\:\  \   /::\~\:\  \   /::\~\:\  \   /:/  \:\  \   /::\  \ ___   /::\~\:\  \   /:/  /   
/:/\:\ \:\__\ /:/\:\ \:\__\ /:/__/  /\__\ /:/__/             /:/ |::::\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/__/ \:\__\ /:/\:\  /\__\ /:/\:\ \:\__\ /:/__/    
\/__\:\/:/  / \/__\:\/:/  / \:\  \ /:/  / \:\  \             \/__/~~/:/  / \/__\:\/:/  / \/_|::\/:/  / \:\~\:\ \/__/ \:\  \  \/__/ \/__\:\/:/  / \/__\:\/:/  / \:\  \    
     \::/  /       \::/  /   \:\  /:/  /   \:\  \                  /:/  /       \::/  /     |:|::/  /   \:\ \:\__\    \:\  \            \::/  /       \::/  /   \:\  \    
      \/__/        /:/  /     \:\/:/  /     \:\  \                /:/  /        /:/  /      |:|\/__/     \:\ \/__/     \:\  \           /:/  /        /:/  /     \:\  \   
                  /:/  /       \::/  /       \:\__\              /:/  /        /:/  /       |:|  |        \:\__\        \:\__\         /:/  /        /:/  /       \:\__\  
                  \/__/         \/__/         \/__/              \/__/         \/__/         \|__|         \/__/         \/__/         \/__/         \/__/         \/__/ 
*/

// window.addEventListener('load', function() {
//      window.addEventListener('orientationchange', function() {
//           var orientation = window.orientation;
//           console.log(orientation)
//           if (orientation === 0) {
//                MobileNavigation.mobileOrNot();
//           } else {
//                const modale = document.getElementById("modaleMobilePortrait");
//                modale.style.display = "none";
//           }
//      });
// });



// Display catacombs room
ImplementationRooms.catasRooms();

// Locomotive scroll 
Scroll.locomotiveScroll();

// Console signature
RoomGen.signature();

// Display modale if mobile in mode 'portrait'
RoomGen.modaleMobile();








