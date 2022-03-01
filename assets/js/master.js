// Start Deffine variables

// Assistant variables
let classCount = 4;
let loadAnimationindex=0;
// end Assistant variables


let sideNavbar    = document.querySelector('#navbar'),
logoText          = document.querySelector('#logoText'),
sideListItem      = document.querySelectorAll('#navbar li'),
togglerButton     = document.querySelector('#togglerBTN'),
innerProjectLocation = document.querySelector('#InnerLocation'),
showMoreBTN       = document.querySelector('#showMoreBTN'),
scrollToTopBTN    = document.querySelector('.scrollToTop'),
sectionsPages     = document.querySelectorAll('body section[data-parent]');

// End Deffine variables


// Start all Events Lisiners 
togglerButton.addEventListener('click',()=>{
    togglerButton.classList.toggle('pressed')
    sideNavbar.classList.toggle('open');
})
// End all Events Lisiners 
window.addEventListener('load',()=>{
    sideListItem[0].classList.add('active');
    CheckForPageDir();
    innerHtmlElementOnPage();
    // 
    document.querySelector('.welcomeheading >:last-child').style.transform= 'translateY(0)';
    document.querySelector('.welcomeheading >:last-child').style.opacity= '1';
    // 
})

window.addEventListener('resize',()=>{
    CheckForPageDir();
})

window.addEventListener('scroll',()=>{
    sectionsPages.forEach(section =>{
        const secTop = section.offsetTop - 200;
        const secHeight = section.offsetHeight;
        const secIDs    = section.getAttribute('id');

        // console.log(secTop + ' ' + secHeight +' '+ secIDs);

        if (window.scrollY >= secTop && window.scrollY < (secHeight + secTop) ) {
            searchForActiveAndRemove();
            addActiveOnTarget(secIDs);
            logoText.textContent= secIDs;

        // Start to disable fade animation
        document.querySelector(`#${secIDs}`).classList.add('fadeDiabled')

        }

    })

})


// window.addEventListener('scroll',()=>{

//     if (window.scrollY >= homePage.scrollHeight) {
//         searchForActiveAndRemove();

//         logoText.textContent= 'home';
//         sideListItem[0].classList.add('active');
//     }

//     if(window.scrollY >= aboutPage.scrollHeight){
//         searchForActiveAndRemove();


//         // Start to disable fade animation
//         document.querySelector('.myInformationCard').style.transform= 'translateY(0)';
//         document.querySelector('.myInformationCard').style.opacity= '1';
//         document.querySelector('.skillsList').style.transform= 'translateY(0)';
//         document.querySelector('.skillsList').style.opacity= '1';
//         // 
//         logoText.textContent= 'about';
//         sideListItem[1].classList.add('active');
//         scrollToTopBTN.classList.add('visable-scroll-btn')
//     }else{
//         scrollToTopBTN.classList.remove('visable-scroll-btn')

//     }

//     if (window.scrollY >= servicesPage.scrollHeight) {
//         searchForActiveAndRemove();


//         // Start to disable fade animation
//         document.querySelector('.servicesList >:first-child').style.transform= 'translateY(0)';
//         document.querySelector('.servicesList >:first-child').style.opacity= '1';

//         document.querySelector('.servicesList >:nth-child(2)').style.transform= 'translateY(0)';
//         document.querySelector('.servicesList >:nth-child(2)').style.opacity= '1';
        
//         document.querySelector('.servicesList >:last-child').style.transform= 'translateY(0)';
//         document.querySelector('.servicesList >:last-child').style.opacity= '1';
//         // 
//         logoText.textContent= 'services';
//         sideListItem[2].classList.add('active');
//     }
//     if (window.scrollY >= galleryPage.scrollHeight) {
//         searchForActiveAndRemove();
//         logoText.textContent= 'gallery';
//         sideListItem[3].classList.add('active');
//     }
//     if (window.scrollY >= contactsPage.scrollHeight) {
//         searchForActiveAndRemove();

//         // Start to disable fade animation
//         document.querySelector('.mainCard').style.transform= 'translateY(0)';
//         document.querySelector('.mainCard').style.opacity= '1';
//         // 
//         logoText.textContent= 'contacts';
//         sideListItem[4].classList.add('active');
//     }
// })

showMoreBTN.addEventListener('click',()=>{
    if(classCount >= projectsList.length){
        showMoreBTN.classList.add('disabledBTN');

    }else{
        classCount+=3
        visableElements();
    }
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

function addActiveOnTarget(id){

    Array.from(document.querySelectorAll('#navbar  ul  li  a')).forEach(link =>{
        if(link.href.split('#')[1] === id){
            link.parentElement.classList.add('active');
        }
    });
}



function innerHtmlElementOnPage(){

    

    for(let i=0 ; i < projectsList.length ;i++){

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
        projectTitle.appendChild(document.createTextNode(projectsList[i].projectName));
        projectBox.appendChild(projectLinks);
        projectLinks.appendChild(repoLink);
        projectLinks.appendChild(liveDemoLink);
        repoLink.appendChild(document.createTextNode('Repository'));
        liveDemoLink.appendChild(document.createTextNode('Live Demo'));

        liveDemoLink.href= projectsList[i].liveDemoLink;
        repoLink.href    = projectsList[i].repoLink;
        imagePreview.src = projectsList[i].projectImg;
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


// loadingOverlay disabled now

// function loadAnimation(){
//     setInterval(()=>{
//         loadingOverlayIndicator.forEach(indicator =>{
            
//             if(indicator.classList.contains('load')){
//                 indicator.classList.remove('load');
//             }

//         })

//         if (loadAnimationindex >= loadingOverlayIndicator.length) {
//             loadAnimationindex = 0;
//         }
//         loadingOverlayIndicator[loadAnimationindex].classList.add('load');
//         loadAnimationindex++
//     },700)
// }
// End Deffine Functions 
