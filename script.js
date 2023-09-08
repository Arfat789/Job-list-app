const jobListContainer = document.getElementById('job-list-container')
const filterContainer = document.getElementById('filter-container')
const filterContainerFather = document.getElementById('filter-container-father')
const btn = document.getElementById('btn')










fetch('./data.json').then(response =>{
   return response.json()}
).then(
  data => {
    let mainList = []
    let filterList = []
    for(i of data){
      mainList.push(i)
    }
   
    
 
    function filterJobsByFilterList(filterList, jobs) {
      return jobs.filter((job) => { // Check if any filter value (role, language, or tool) matches the job
        return filterList.every((filterValue) => {
          return (
            filterValue === job.role ||
            job.languages.includes(filterValue) ||
            job.tools.includes(filterValue)
          );
        });
       
      });
    }

    
    
   
    update()
   
    function update(){
      console.log('updated')
      let newList = filterJobsByFilterList(filterList,mainList)
      let dummyList = newList;
      jobListContainer.innerHTML = '';
      
      newList.forEach(element =>{
        let langAndToolList = []
      element.languages.forEach((lang)=>{
        langAndToolList.push(lang)
      })
      element.tools.forEach((tool)=>{
        langAndToolList.push(tool)
      })
        const jobBox = document.createElement('div')
        jobBox.classList.add('job-list-box')
        jobBox.innerHTML = `
            <img src="${element.logo}" alt="">

            <div class="middle-box">
              <div class="top-div">
              <H3>${element.company}</H3>
              ${element.new == true ? '<p class="new">NEW!</p>' : ''}
              ${element.featured == true ? '<p class="featured">FEATURED</p>' : ''}
            </div>
            <div class="middle-div"><h2>${element.position}</h2></div>
            <ul class="bottom-div flex">
              <p>${element.postedAt}</p>
              <p>${element.contract}</p>
              <p>${element.location}</p>
            </div>
            </ul>
            <div class="right-box">
              <div class="filter-box">
                <p class="addAble">${element.role}</p>
            </div>
            ${langAndToolList.map(item => `
               <div class="filter-box">  
                <p class="addAble">${item}</p>
               </div> `
            ).join('')}</div> `;
        jobListContainer.appendChild(jobBox)
      })
      checkOut()
    }
 



   function checkOut(){//this is to add filter
    console.log('check')
    const addAble = document.querySelectorAll('.addAble')
    addAble.forEach((text) =>{
     
      text.addEventListener('click', ()=>{
      filterList.push(text.textContent)
      refresh()
      // update()
      })

      if(filterList.length == 0){
        filterContainer.style.display = 'none'
        filterContainerFather.style.display = 'none'
      }else{
        filterContainer.style.display = 'flex'
        filterContainerFather.style.display = 'flex'
      }
      
    } 
  );
}




function refresh(){ //this take item from the list as string and put to filterbox
    filterContainer.innerHTML = ''
    filterList.forEach((item)=>{
      const filterBox = document.createElement('div')
      filterBox.classList.add('filter-box')
      filterBox.innerHTML = `
        <p>${item}</p>
         <div class='close'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
        </div> `;
      filterContainer.appendChild(filterBox)
      removeDuplicatesInPlace()
      const close = document.querySelectorAll('.close')
      removeItem(close)
      update()
      
    })
    if(filterList.length == 0){
    filterContainer.style.display = 'none'
    filterContainerFather.style.display = 'none'
    }else{
    filterContainer.style.display = 'flex'
    filterContainerFather.style.display = 'flex'
    }
    
}




function removeDuplicatesInPlace() {//this functionn remove the duplicate item from the filter box
      for (let i = 0; i < filterList.length; i++) {
        for (let j = i + 1; j < filterList.length; j++) {
          if (filterList[i] === filterList[j]) {
            filterList.splice(j, 1);
            j--; 
          }
        }
       
      }
    }
    
  


    function removeItem(item) {
      item.forEach(closeButton => {
        closeButton.addEventListener('click', () => {
          const mainText = closeButton.parentElement.querySelector('p').textContent;
          const indexToRemove = filterList.indexOf(mainText);
          if (indexToRemove !== -1) {
            filterList.splice(indexToRemove, 1);
            btn.addEventListener('click',()=>{
              filterList.length = 0;
              console.log('done')
            })
            refresh();
            update()
          }
        });
      });
    }




    btn.addEventListener('click',()=>{
      filterList.length = 0;
      refresh()
      update()
    })


   



















// let filterList = []

// function update(){
//    fetch('/data.json')
    // .then(response => response.json()) // Parse the response body as JSON
//     .then(data => {
//       let mainList = []
//       for(i of data){
//         mainList.push(i)
//       }

//         let oueson = false;

//        const  newList = mainList.filter(item => {
//         // Check if at least one filter matches in role, languages, or tools

//         for(i of filterList){
//           if(i == item.role){
//             oueson = true;
//           }else{
//             oueson = false;
//           }
//         }

//         return (
//           filterList.every(filter => item.languages.includes(filter)) ||
//           filterList.every(filter => item.tools.includes(filter))  ||
//           filterList.every(filter => item.role.includes(filter)) 
       
//         );
       
//       });
      
      
      
//       // console.log(newList)
//       console.log(oueson)
//       console.log(filterList)
      
        
//       // console.log(newList)

//       let dummyList = []
//       if(filterList.length == 0){
//         dummyList = mainList;
//       }else{
//         dummyList = newList;
//       }

//       jobListContainer.innerHTML = ''
//       dummyList.forEach((element)=>{

//         let langAndToolList = []
//         element.languages.forEach((lang)=>{
//           langAndToolList.push(lang)
//         })
//        element.tools.forEach((tool)=>{
//           langAndToolList.push(tool)
//        })

      // const jobBox = document.createElement('div')
      // jobBox.classList.add('job-list-box')
      // jobBox.innerHTML = `
      //     <img src="${element.logo}" alt="">
      //     <div class="middle-box">
      //       <div class="top-div">
      //       <H3>${element.company}</H3>
      //       ${element.new == true ? '<p class="new">NEW!</p>' : ''}
      //       ${element.featured == true ? '<p class="featured">FEATURED</p>' : ''}
      //     </div>
      //     <div class="middle-div"><h2>${element.position}</h2></div>
      //     <ul class="bottom-div flex">
      //       <p>${element.postedAt}</p>
      //       <p>${element.contract}</p>
      //       <p>${element.location}</p>
      //     </div>
      //     </ul>
      //     <div class="right-box">
      //       <div class="filter-box">
      //         <p class="addAble">${element.role}</p>
      //     </div>
      //     ${langAndToolList.map(item => `
      //        <div class="filter-box">  
      //         <p class="addAble">${item}</p>
      //        </div> `
      //     ).join('')}</div> `;
//      jobListContainer.appendChild(jobBox)
//     })
//     checkOut()
//   }).then(
    
// //   )
  
//    .catch(error => {
//       console.error('Error fetching data:', error);
//    });
// }







// function removeDuplicatesInPlace() {//this functionn remove the duplicate item from the filter box
//     for (let i = 0; i < filterList.length; i++) {
//       for (let j = i + 1; j < filterList.length; j++) {
//         if (filterList[i] === filterList[j]) {
//           filterList.splice(j, 1);
//           j--; 
//         }
//       }
//     }
//   }




// function checkOut(){//this is to add filter
//   
    
//     const addAble = document.querySelectorAll('.addAble')
//     addAble.forEach((text) =>{
//       if(filterList.length == 0){
//         filterContainer.style.display = 'none'
//         filterContainerFather.style.display = 'none'
//       }else{
//         filterContainer.style.display = 'flex'
//         filterContainerFather.style.display = 'flex'
//       }
//       text.addEventListener('click', ()=>{
//       filterList.push(text.textContent)
//       update()
//       refresh()
//       })
//     }) 
//   );
  
// }




// function removeItem(item){//this deleted an item from the filter box
//   item.forEach((dil)=>{
    
//     dil.addEventListener('click',()=>{
//        console.log(dil.parentElement.querySelector('p').textContent)
//        const indexx  = filterList.indexOf(dil.parentElement.querySelector('p').textContent)
//        console.log(indexx)
//        console.log(filterList)
//        filterList.splice(indexx, 1);
//        refresh()
//     })
//   }) 
// }




// function refresh(){ //this take item from the list as string and put to filterbox

//   filterContainer.innerHTML = ''
    
//     filterList.forEach((item)=>{
      
//       const filterBox = document.createElement('div')
//       filterBox.classList.add('filter-box')
//       filterBox.innerHTML = `
//         <p>${item}</p>
//          <div class='close'>
//             <svg  xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
//         </div> `;
//       filterContainer.appendChild(filterBox)
//       removeDuplicatesInPlace()
//       const close = document.querySelectorAll('.close')
//       removeItem(close)
//     })
//     if(filterList.length == 0){
//     filterContainer.style.display = 'none'
//     filterContainerFather.style.display = 'none'
//     }else{
//     filterContainer.style.display = 'flex'
//     filterContainerFather.style.display = 'flex'
//     }
//     update()

// }




































  }
 
).catch(error=>{
  console.log(error)
})
