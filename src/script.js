import './style.css';
import * as Scroll from './scroll.js';
import * as ImplementationRooms from './implementationRooms.js'
import * as RoomGen from './roomGen.js';
import * as MobileNavigation from './mobileNavigation.js';
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

// Display catacombs room
ImplementationRooms.catasRooms();

// Locomotive scroll 
Scroll.locomotiveScroll();

// Console signature
RoomGen.signature();

// Modale if navigation width mobile in portrait mode
RoomGen.modaleMobile();










