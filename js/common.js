document.addEventListener('DOMContentLoaded', function() {
  // nav menu
 //const menus = document.querySelectorAll('.side-menu');
 // M.Sidenav.init(menus, {edge: 'left'});
// nav menu on my old ipad
const menu = document.querySelector('#side-menu');
M.Sidenav.init(menu, {edge: 'left'});

  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'right'});
});