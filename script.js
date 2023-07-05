const initialize = ()=>{  //function to hold the entire code 
// fetching the job details from an API
function fetchJobs(){
    fetch("http://localhost:3000/jobs")
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
    })
}
fetchJobs()
}












document.addEventListener("DOMContentLoaded" ,initialize)

