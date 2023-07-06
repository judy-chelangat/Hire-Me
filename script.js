// //step 1 I  want to fetch a list of all the available jobs and display it on the dom  
// //so I will have to implement a function that fetches the data and display it on the dom when the page loads 
const initialize = ()=>{  //function to hold the entire code 
// fetching the job details from server
function jobDetails(){
    fetch("http://localhost:3000/jobs")
    .then(resp => resp.json())
    .then(data =>{
                // console.log(data)
        data.forEach(job=>{
        displayJobs(job) // passing in a function to the data returned
        });

        //event listener on the form
        const jobSearchForm = document.getElementById("jobSearchForm");
        jobSearchForm.addEventListener("submit", jobHandle)
        //function to handle the job searched for 
        function jobHandle(e ) {
          e.preventDefault();

          // Retrieve the search term entered by the user
          const roleInput = document.getElementById("roleInput");
          const searchTerm = roleInput.value.toLowerCase().trim();

          //if statement to check whether the searchterm is empty
          if(searchTerm === " "){
            displayJobs(job)
          }
          
          // Filter the job list based on the search term
          const filteredJobs = data.filter(job => {
            const position = job.position.toLowerCase();
            return position.includes(searchTerm);
          });

          // Clear the existing job list on the DOM
          clearJobList();

          // Display the filtered job results on the DOM
          filteredJobs.forEach(job =>{
            displayJobs(job)
          });
        };
      })
        //  .catch(error =>{
        //     console.log("error")
        //  })

        function displayJobs(list){
        const mainContainer =document.getElementById("jobList")
       const details = document.createElement("div")
       details.className = "job-details"; // add class name for styling
        // dom manipulation to show the job details
          details.innerHTML=`
          <div class="left-side">
                <div class="img"><img src="${list.logo}"></div>

                <div >
                    <h6 class="mb-4 mt-4">${list.position}</h6>
                    <p>${list.postedAt} . ${list.contract} .${list.location}</p>
                </div>
          </div>
          
          <div class="right-side">
            <p>${list.languages}</p>
            <a href="">Apply Now</a>
        </div>
          `
          mainContainer.appendChild(details)
    }
    
}
 // Function to clear the existing job list on the DOM
 function clearJobList() {
    const mainContainer = document.getElementById("jobList");
    mainContainer.innerHTML = "";
  }
jobDetails()

    // adding an event listener to the post a job  button on the header
    const submitButton =document.getElementById("postJobButton") 
    submitButton.addEventListener("click",handleClick)

    // function to handle the submit event
    function handleClick(){
      // showing the form when the user clicks the button 
      const jobPostForm =document.getElementById("jobPostForm")
      jobPostForm.style.display =jobPostForm.style.display === "none" ? "block":"none";
    }
      //adding an event listener to the form submission
    const jobForm =document.getElementById("jobPostForm")
    jobForm.addEventListener("submit",handleForm)

    //function to handle the form submission
    function handleForm(e){
      e.preventDefault();

      //retrieve the job details from the form
      const positionInput = document.getElementById("positionInput").value;
      const languagesInput = document.getElementById("languagesInput").value;
      const locationInput = document.getElementById("locationInput").value;
      
      //object with the retrieved details
      const job ={
        position:positionInput,
        languages:languagesInput,
        location:locationInput
      };

      //sending a post request to update the json file
      fetch("http://localhost:3000/jobs",{
        method:"POST",
        headers:{
          "Content-Type":"Application/json"
        },
       body:JSON.stringify(job)
      })
      .then(resp =>resp.json())
      .then(data =>{
        console.log(data)
      })
      .catch(error=>{
        console.log("error posting data")
      })
    }




    }








document.addEventListener("DOMContentLoaded" ,initialize)

