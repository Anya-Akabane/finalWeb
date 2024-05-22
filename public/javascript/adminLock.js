const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {

    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menuli = dropdown.querySelector('.menu-li'); 
    const options = dropdown.querySelectorAll('.menu-li li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        dropdown.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menuli.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = option.innerText;

            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menuli.classList.remove('menu-open');

            options.forEach(option => {
               
                    option.classList.remove('active');
                
            });

            option.classList.add('active');
           
        });
    });
}
);
