// //step 1 I  want to fetch a list of all the available jobs and display it on the dom
// //so I will have to implement a function that fetches the data and display it on the dom when the page loads
const initialize = () => {
  //function to hold the entire code
  // fetching the job details from server
  function jobDetails() {
    fetch("https://hireme-9kv4.onrender.com/jobs")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        data.forEach((job) => {
          displayJobs(job); // passing in a function to the data returned
        });

        //event listener on the form
        const jobSearchForm = document.getElementById("jobSearchForm");
        jobSearchForm.addEventListener("submit", jobHandle);
        //function to handle the job searched for
        function jobHandle(e) {
          e.preventDefault();

          // Retrieve the search term entered by the user
          const roleInput = document.getElementById("roleInput");
          const searchTerm = roleInput.value.toLowerCase().trim();

          //if statement to check whether the searchterm is empty
          if (searchTerm === " ") {
            displayJobs(job);
          }

          // Filter the job list based on the search term
          const filteredJobs = data.filter((job) => {
            const position = job.position.toLowerCase();
            return position.includes(searchTerm);
          });

          // Clear the existing job list on the DOM
          clearJobList();

          // Display the filtered job results on the DOM
          filteredJobs.forEach((job) => {
            displayJobs(job);
          });
        }
      });
    //  .catch(error =>{
    //     console.log("error")
    //  })

    function displayJobs(list) {
      const mainContainer = document.getElementById("jobList");
      const details = document.createElement("div");
      details.className = "job-details"; // add class name for styling
      // dom manipulation to show the job details
      details.innerHTML = `
          <div class="left-side">
                <div class="img"><img src="${list.logo}"></div>

                <div >
                    <h6 class="mb-4 mt-4">${list.position}</h6>
                    <p>${list.postedAt} . ${list.contract} .${list.location}</p>
                </div>
          </div>
          
          <div class="right-side">
            <p>${list.languages}</p>
            <a href="${list.link}">Apply Now</a>
            <button class="remove-job">X</button> <!-- Add the X button -->
        </div>
          `;
      // adding an event listener on the x button
      const removeJob = details.querySelector(".remove-job");
      removeJob.addEventListener("click", function () {
        details.remove();
        // deleteJobDetails(list.id)
      });
      mainContainer.appendChild(details);
    }
  }
  // Function to clear the existing job list on the DOM
  function clearJobList() {
    const mainContainer = document.getElementById("jobList");
    mainContainer.innerHTML = "";
  }
  jobDetails();
  // const jobButton = document.getElementById("jobButton");
  // const jobPopupForm = document.getElementById("jobPopupForm");
  // const overlay = document.getElementById("overlay");

  // jobButton.addEventListener("click", function() {
  //     jobPopupForm.style.display = "block";
  //     overlay.style.display = "block";
  // });

  // overlay.addEventListener("click", function() {
  //     jobPopupForm.style.display = "none";
  //     overlay.style.display = "none";
  // });

  //   //adding an event listener to the form submission
  const jobForm = document.getElementById("jobForm");
  jobForm.addEventListener("submit", handleForm);

  //function to handle the form submission
  function handleForm(e) {
    e.preventDefault();

    //retrieve the job details from the form
    const positionInput = document.getElementById("positionInput").value;
    const languagesInput = document.getElementById("languagesInput").value;
    const locationInput = document.getElementById("locationInput").value;
    const contract = document.getElementById("availabilityInput").value;
    const link = document.getElementById("linkInput").value;
    //object with the retrieved details
    const jobsObj = {
      company: "Photosnap",
      logo: "./images/photosnap.svg",
      new: true,
      featured: true,
      position: positionInput,
      role: "Frontend",
      level: "Senior",
      postedAt: "Now",
      contract: contract,
      location: locationInput,
      languages: [languagesInput],
      link: link,
      tools: [],
    };
    postJob(jobsObj);
    document.getElementById("jobForm").reset();
  }

  //function to send a POST request
  function postJob(jobsObj) {
    fetch("https://hireme-9kv4.onrender.com/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobsObj),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error posting data");
      });
  }

  //function to delete a job posting
  // function deleteJobDetails(id){
  //   fetch(`https://hireme-9kv4.onrender.com/jobs/${id}`,{
  //     method:"DELETE",
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   })
  //   .then(resp => resp.json())
  //   .then(data => console.log(data))
  // }
};

document.addEventListener("DOMContentLoaded", initialize);
