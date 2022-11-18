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

// var div_cliquable = $('.buttonRoom3D');
// var pointCliquable = $('.pointRoom');

//     $(pointCliquable).hover(function(e) {
    
//     // Si ce n'est pas #ma_div ni un de ses enfants
//     if( !$(e.target).is(div_cliquable) && !$.contains(div_cliquable[0],e.target) ) {
//         div_cliquable.fadeOut() // masque #ma_div en fondu
//     }
//     });