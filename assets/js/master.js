// Start Deffine variables
let apiurl = '../../projects.json';


// Assistant variables
let apiProjectLength ;
let classCount = 4;
let loadAnimationindex=0;
// end Assistant variables


let sideNavbar    = document.querySelector('#navbar'),
logoText        = document.querySelector('#logoText'),
sideListItem    = document.querySelectorAll('#navbar li'),
togglerButton = document.querySelector('#togglerBTN'),
innerProjectLocation = document.querySelector('#InnerLocation'),
showMoreBTN = document.querySelector('#showMoreBTN');
scrollToTopBTN = document.querySelector('.scrollToTop');
loadingOverlay = document.querySelector('#loadingOverlay');
loadingOverlayIndicator = document.querySelectorAll('#loadingOverlay ul li');
// End Deffine variables


// Start all Events Lisiners 
togglerButton.addEventListener('click',()=>{
    togglerButton.classList.toggle('pressed')
    sideNavbar.classList.toggle('open');
})
// End all Events Lisiners 
window.addEventListener('load',()=>{
    loadAnimation();
    sideListItem[0].classList.add('active');
    fetchProjectsList(apiurl);
    CheckForPageDir();

})

window.addEventListener('resize',()=>{
    CheckForPageDir();
})


window.addEventListener('scroll',()=>{
    if (window.scrollY >= 0) {
        searchForActiveAndRemove();

        logoText.textContent= 'home';
        sideListItem[0].classList.add('active');
    }

    if(window.scrollY >= 404){
        searchForActiveAndRemove();

        logoText.textContent= 'about';
        sideListItem[1].classList.add('active');

        scrollToTopBTN.classList.add('visable-scroll-btn')
    }else{
        scrollToTopBTN.classList.remove('visable-scroll-btn')

    }

    if (window.scrollY >= 1021) {
        searchForActiveAndRemove();
        logoText.textContent= 'services';
        sideListItem[2].classList.add('active');
    }
    if (window.scrollY >= 1632) {
        searchForActiveAndRemove();
        logoText.textContent= 'gallery';
        sideListItem[3].classList.add('active');
    }
    if (window.scrollY >= 2269) {
        searchForActiveAndRemove();
        logoText.textContent= 'contacts';
        sideListItem[4].classList.add('active');
    }
})

showMoreBTN.addEventListener('click',()=>{
    if (classCount >= apiProjectLength) {
        classCount = apiProjectLength;
    }else{
        classCount+=3
    }
    visableElements();
})

scrollToTopBTN.addEventListener('click',()=>{
    window.scroll(-innerHeight,-innerHeight);
})

// Start Conditions
if (document.querySelector('html').lang == 'ar' ) {
    if (sideNavbar.classList.contains('eng')) {
        sideNavbar.classList.remove('eng');
    }
    sideNavbar.classList.add('arabic');

    
}else{
    if (sideNavbar.classList.contains('arabic')) {
        sideNavbar.classList.remove('arabic');
    }
    sideNavbar.classList.add('eng');
}

sideListItem.forEach(li =>{
    li.addEventListener('click',(e)=>{
        sideListItem.forEach(li=>{
        if (li.classList.contains('active')) {
            li.classList.remove('active')
        }
        })
        
        e.target.closest('li').classList.add('active');
    })
})
// end Conditions



// Start Deffine Functions 
function searchForActiveAndRemove(){
    sideListItem.forEach(li => {
        if (li.classList.contains('active')) {
            li.classList.remove('active');

        }
    })
}


async function fetchProjectsList(api){
    const response = await fetch(api,{
        headers:{
            'Content-Type':'application/json',
        },
        method:'GET',

    });
    const data     = await response.json();

    

    apiProjectLength = data.length;
    innerHtmlElementOnPage(data);

    // remove loading overlay if connection is successed
    if (response.status === 200) {
        setTimeout(() => {
            loadingOverlay.remove();
        }, 1500);
    }
}


function innerHtmlElementOnPage(Data){

    for(let i=0 ; i < Data.length ;i++){

        const projectBox   = document.createElement('article');
        const projectImg   = document.createElement('div');
        const projectLinks = document.createElement('div');
        const imagePreview = document.createElement('img');
        const repoLink     = document.createElement('a');
        const liveDemoLink = document.createElement('a');
        const projectTitle = document.createElement('h5');

        projectBox.appendChild(projectImg);
        projectImg.appendChild(imagePreview);
        projectBox.appendChild(projectTitle);
        projectTitle.appendChild(document.createTextNode(Data[i].projectName));
        projectBox.appendChild(projectLinks);
        projectLinks.appendChild(repoLink);
        projectLinks.appendChild(liveDemoLink);
        repoLink.appendChild(document.createTextNode('Repository'));
        liveDemoLink.appendChild(document.createTextNode('Live Demo'));

        liveDemoLink.href= Data[i].liveDemoLink;
        repoLink.href    = Data[i].repoLink;
        imagePreview.src = Data[i].projectImg;
        imagePreview.alt = 'project #' + [i+1];


        projectBox.className = 'projectBox';
        projectTitle.className = 'projectTitle';
        projectLinks.className = 'projectLinks';
        repoLink.setAttribute('role','button');
        liveDemoLink.setAttribute('role','button');
        projectImg.className = 'projectImage';


        innerProjectLocation.prepend(projectBox);

    }
    visableElements()

}

function visableElements(){
    for(let i=0 ; i< classCount ;i++){
        innerProjectLocation.childNodes[i].classList.add('cardIs-visable');
    }
}

function CheckForPageDir(){
    if (document.querySelector('html').lang == 'ar' && window.innerWidth <= 768) {
        sideNavbar.classList.add('smallMediaAR');
        
    }else{
        sideNavbar.classList.remove('smallMediaAR');
    }
    
    
    if (document.querySelector('html').lang == 'en' && window.innerWidth <= 768) {
        sideNavbar.classList.add('smallMediaEn');
    }else{
        sideNavbar.classList.remove('smallMediaEn');
    }
}

function loadAnimation(){
    setInterval(()=>{
        loadingOverlayIndicator.forEach(indicator =>{
            
            if(indicator.classList.contains('load')){
                indicator.classList.remove('load');
            }

        })

        if (loadAnimationindex >= loadingOverlayIndicator.length) {
            loadAnimationindex = 0;
        }
        loadingOverlayIndicator[loadAnimationindex].classList.add('load');
        loadAnimationindex++
    },700)
}
// End Deffine Functions 
