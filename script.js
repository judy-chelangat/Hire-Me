//step 1 I  want to fetch a list of all the available jobs and display it on the dom  
//so I will have to implement a function that fetches the data and display it on the dom when the page loads 
const initialize = ()=>{  //function to hold the entire code 
// fetching the job details from server
function jobDetails(){
    fetch("http://localhost:3000/jobs")
    .then(resp => resp.json())
    .then(data =>{
        data.forEach(list =>{
        fetchJobs(list) // passing in a function to the data returned
        });
      
        console.log(data)
    })

    function fetchJobs(list){
        const mainContainer =document.getElementById("jobList")
       const details = document.createElement("div")
       details.className = "job-details"; // add class name for styling
// dom manipulation to show the job details
          details.innerHTML=`
          <div class="left-side">
                <div class="img src ="${list.logo}"</div
                <div>
                    <h6>${list.position}</h6>
                    <p>${list.postedAt}</p>
                    <p>${list.contract}</p>
                    <p>${list.location}</p>
                </div>
          </div>
          
          <div class="right-side "
             <p>${list.languages}</p>
          </div>
          
          
          `
          mainContainer.appendChild(details)
    }
}
jobDetails()
}












document.addEventListener("DOMContentLoaded" ,initialize)

