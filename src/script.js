import './style.css';
import * as Scroll from './scroll.js';
import * as ImplementationRooms from './implementationRooms.js'
import * as RoomGen from './roomGen.js';
import * as MobileNavigation from './mobileNavigation';
// import * as WidthVR from './widthVR.js';
import $ from 'jquery'; 

// Display catacombs rooms
ImplementationRooms.catasRooms();

// Help for mobile ( VR / AR )
MobileNavigation.mobileOrNot();

// QR Code
// RoomGen.qrGen();

// Locomotive scroll 
Scroll.locomotiveScroll();

// Console signature
RoomGen.signature();

// WidthVR.makePanel();

