// window.addEventListener("load", function(){
//     document.querySelector(".preloader").classList.add("opacity-0");
//     setTimeout(function(){
//         document.querySelector(".preloader").style.display="none";
//     },1000)
// })

// new loader
window.addEventListener("load", function(){
    document.querySelector(".newLoader").classList.add("opacity-0");
    setTimeout(function(){
        document.querySelector(".newLoader").style.display="none";
    },1000)
})
// new loader end
// portfolio items
const filterContainer=document.querySelector(".portfolio-filter"),
    filterBtns=filterContainer.children,
    totalFilterBtns=filterBtns.length,
    portfolioItems=document.querySelectorAll(".portfolio-items"),
    totalPortfolioItems=portfolioItems.length;


    for(let i=0; i<totalFilterBtns;i++){
        filterBtns[i].addEventListener("click", function(){
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");
            const filterValue = this.getAttribute("data-filter");
            for(let k=0;k<totalPortfolioItems;k++){
                if(filterValue === portfolioItems[k].getAttribute("data-category")){
                    portfolioItems[k].classList.add("show");
                    portfolioItems[k].classList.remove("hide");
                }
                else{
                    portfolioItems[k].classList.remove("show");
                    portfolioItems[k].classList.add("hide");
                }
                if(filterValue === "all"){
                    portfolioItems[k].classList.add("show");
                    portfolioItems[k].classList.remove("hide");
                }
            }
        })
    }

    // Portfolio Lightbox
    const lightbox = document.querySelector(".lightbox"),
    closeLightbox = document.querySelector(".lightbox-close"),
    lightboxImg = document.querySelector(".lightbox-image"),
    lightboxText = document.querySelector(".caption-text"),
    lightboxCounter = document.querySelector(".caption-counter");

    let itemIndex = 0;
    for(let i = 0; i<totalPortfolioItems; i++){
        portfolioItems[i].addEventListener("click", function(){
            itemIndex = i;
            changeItem();
            toggleLightbox();
        })
        
    }
    function nextItem(){
        if(itemIndex == totalPortfolioItems-1){
            itemIndex = 0;
        }
        else{
            itemIndex++;
        }
        changeItem();
    }
    function prevItem(){
        if(itemIndex == 0){
            itemIndex = totalPortfolioItems-1;
        }
        else{
            itemIndex--;
        }
        changeItem();
    }
    
    function toggleLightbox(){
        lightbox.classList.toggle("open");
    }
    function changeItem(){
        imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
        lightboxImg.src = imgSrc;
        lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
        lightboxCounter.innerHTML = (itemIndex+1) + " of " + totalPortfolioItems;
    }

    // close lightbox
    lightbox.addEventListener("click", function(){
        if(event.target === closeLightbox){
            toggleLightbox();
        }
    })


    // aside navbar
    const nav = document.querySelector(".nav"),
          navList = nav.querySelectorAll("li"),
          totalNavList = navList.length,
          allSection = document.querySelectorAll(".section"),
          totalSection = allSection.length;

    for(let i = 0; i < totalNavList ; i++){
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function(){
            // remove back-section
            removeBackSectionClass();
            for(let j = 0; j<totalNavList; j++){
                // add back-section class 
                if(navList[j].querySelector("a").classList.contains("active")){
                    addBackSectionClass(j);
                    
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showAction(this);
            if(window.innerWidth < 1200){
                asideSectionTogglerBtn();
            }
        })
    }      

    function addBackSectionClass(num){
        allSection[num].classList.add("back-section");
    }

    function removeBackSectionClass(){
        for(let i =0; i<totalSection; i++){
            allSection[i].classList.remove("back-section");
        }
    }

    function showAction(element){
        for(let i =0; i<totalSection; i++){
            allSection[i].classList.remove("active");
        }
       const target =  element.getAttribute("href").split("#")[1];
       document.querySelector("#"+target).classList.add("active")
    }

    function updateNav(element){
        for(let i=0; i<totalNavList; i++){
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }

    document.querySelector(".hire-me").addEventListener( "click", function(){
        const sectionIndex = this.getAttribute("data-section-index");
        showAction(this);
        updateNav(this);
        removeBackSectionClass();
        addBackSectionClass(sectionIndex);
    })

    const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

    navTogglerBtn.addEventListener("click", ()=>{
        asideSectionTogglerBtn();
    })
    
    function asideSectionTogglerBtn(){
        aside.classList.toggle("open"); 
        navTogglerBtn.classList.toggle("open");
        for(let i =0; i<totalSection; i++){
            allSection[i].classList.toggle("open");
        }
    }