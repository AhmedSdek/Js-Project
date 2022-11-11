let upBtn = document.querySelector('body .up-btn');

upBtn.addEventListener('click', function() {
    window.scrollTo({
        top : 0,
        behavior : 'smooth'
    });
});
//check if local storege color 
let mainColors = localStorage.getItem('colors_option');

if (mainColors !== null){

    document.documentElement.style.setProperty('--main-color', mainColors);


    document.querySelectorAll('.colors-list li').forEach(element => {
        element.classList.remove('active');

        if (element.dataset.color === mainColors){
            element.classList.add('active');
        }
    });
}

// random background option

let backgroundOption = true ;

//var to control the interval
let backgroundInterval;

// check if theres local storege random is empty
let backgroundLocalItem = localStorage.getItem('backgrong_option');

if(backgroundLocalItem !== null){
    
    document.querySelectorAll('.btn-box button').forEach(element => {
        element.classList.remove('active');
    })

    if(backgroundLocalItem === 'true'){

        backgroundOption = true;

        document.querySelector('.btn-box .yes').classList.add('active');

    }else{
        backgroundOption = false;

        document.querySelector('.btn-box .no').classList.add('active');
    };

}

// click on toggle setings box

let icon = document.querySelector('.toggle-settings .icon');

let settingsBox = document.querySelector('.settings-box');

icon.onclick = function(){
    this.classList.toggle('fa-spin');
    settingsBox.classList.toggle('open')
};

//switch Colors
let colorsLi = document.querySelectorAll('.colors-list li');

colorsLi.forEach(li =>{

    li.addEventListener('click',(e) => {

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color in local storge

        localStorage.setItem('colors_option', e.target.dataset.color);

        handelActive(e);
    });
});


//switch background
let randomBackEl = document.querySelectorAll('.btn-box button');

randomBackEl.forEach(btn =>{

    btn.addEventListener('click',(e) => {
        //remove active class 
        handelActive(e);

        if(e.target.dataset.background === "yes"){
            
            backgroundOption = true;
            localStorage.setItem('backgrong_option' , true);
            randomizeImgs();

        }else{
            backgroundOption = false;
            localStorage.setItem('backgrong_option' , false);
            clearInterval(backgroundInterval);

        }
    });

});


//select landing page element
let landingPage = document.querySelector('.landing-page');
//get Array of Imge
let imgsArray = ['1.jpg' , '5.jpg' , '8.jpg'];



//function to random img 

function randomizeImgs(){
    
    if(backgroundOption === true){

        backgroundInterval = setInterval(() =>{

            //get random namber 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //chang background 
        landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber]+'")';
        
        }, 5000);
    }
}
randomizeImgs()



// select skills selector 

let ourSkills = document .querySelector('.skills');

window.onscroll = function(){

    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills outer hight  
    let  skillsOuterHight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    //window scrolltop
    let windowScrollTop = this.pageYOffset;
    
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHight - windowHeight) - 100){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    };
    //sd
    if(window.scrollY >= 410){
        upBtn.style.display = 'block';
    }else{
        upBtn.style.display = 'none';
    }
};
// create popup with the image 

let ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {

        // creat overlay element
        let overlay = document.createElement('div');
        // add class to overlay
        overlay.className = 'popup-overlay';
        // append overlay to body
        document.body.appendChild(overlay);
        //creat the popup box
        let popupBox = document.createElement('div');
        // add class to the popup box
        popupBox.className = 'popup-box';

        if(img.alt !== null){

            //creat Heading
            let imgHeading = document.createElement('h3');

            // creat text for heading
            let imgText = document.createTextNode(img.alt);

            //append text to heading 
            imgHeading.appendChild(imgText);
            

            //append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }
        //creat the img
        let popupImage = document.createElement('img');
        //set imge src
        popupImage.src = img.src;
        //add img to popup-box
        popupBox.appendChild(popupImage);
        //apend the popup box to body
        document.body.appendChild(popupBox);

        //creat the close  span
        let closeButton = document.createElement('span');

        // creat the close button 
        let closeButtonText = document.createTextNode('X');
        // append text to span
        closeButton.appendChild(closeButtonText);
        //add class to close button
        closeButton.className = 'close-button';

        //add close button to popup box
        popupBox.appendChild(closeButton);
    });
});

// close the popup 
document.addEventListener('click', function(e){

    if(e.target.className == 'close-button'){

        // remove the current popup
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }

});

//select All bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
// allBullets.forEach(bullet => {
//     bullet.addEventListener('click', (e) =>{
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         })
//     });
// });

const allLinks = document.querySelectorAll('.links a');
// allLinks.forEach(link => {
//     link.addEventListener('click', (e) =>{
//         e.preventDefault();
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         })
//     });
// });

function scrollToSections (element){
    element.forEach(ele => {
        ele.addEventListener('click', (e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        });
    });
};
scrollToSections(allBullets);
scrollToSections(allLinks);

// handel Active class 
function handelActive(ev){
    //remove active class
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    //add class
    ev.target.classList.add('active');
};

//bullets option
let bulletsToggle = document.querySelectorAll('.bullets-option button');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem('bullets_option');

if(bulletLocalItem !== null){
    bulletsToggle.forEach(btn => {
        btn.classList.remove('active');
    });

    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }

};
bulletsToggle.forEach(btn => {
    btn.addEventListener('click', (e) =>{
        if(btn.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_option', "block")
        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_option', "none")
        };
        handelActive(e);

    });
});

//reset button
document.querySelector('.reset-option').onclick = function(){
    // localStorage.clear();
    localStorage.removeItem('bullets_option');
    localStorage.removeItem('colors_option');
    localStorage.removeItem('backgrong_option');
    window.location.reload();

};

//toggle menu 
let toggleMenu = document.querySelector('.toggle-menu');
let tLinks =document.querySelector('.links');

toggleMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
});

// click Anywhere outside menu And Toggle menu

document.addEventListener('click', (e) => {
    if(e.target !== toggleMenu && e.target !== tLinks){
        // check if menu is open
        if(tLinks.classList.contains('open')){
            toggleMenu.classList.remove('menu-active');
            tLinks.classList.remove('open')
        }

    }
});

// stop propagition on li 

tLinks.onclick = function(e){
    e.stopPropagation();
}