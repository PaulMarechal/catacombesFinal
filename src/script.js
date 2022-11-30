import './style.css';
import * as Scroll from './scroll.js';
import * as implementationRooms from './implementationRooms.js'
import * as roomGen from './roomGen.js';
import $ from 'jquery'; 

// Display catacombs rooms
implementationRooms.catasRooms();

// Locomotive scroll 
Scroll.locomotiveScroll();

// Console signature
roomGen.signature();
