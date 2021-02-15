document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = id => {
  id = id.toString();
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(issues)
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  id = id.toString();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  let numberOfIssueOpened = 0;
  for (var i = 0; i < issues.length; i++) {
    const assignedIssue = issues[i];
    
    if(assignedIssue.status === 'Closed'){
      issuesList.innerHTML += `<div class="well" style="opacity: 0.5;">
                              <h6>Issue ID: ${assignedIssue.id} </h6>
                              <p><span class="label label-info"> ${assignedIssue.status} </span></p>
                              <h3 style="text-decoration: line-through;"> ${assignedIssue.description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${assignedIssue.severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedIssue.assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${assignedIssue.id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${assignedIssue.id})" class="btn btn-danger">Delete</a>
                              </div>
                              `;
    }
    else{
      numberOfIssueOpened++;
      issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${assignedIssue.id} </h6>
                              <p><span class="label label-info"> ${assignedIssue.status} </span></p>
                              <h3> ${assignedIssue.description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${assignedIssue.severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedIssue.assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${assignedIssue.id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${assignedIssue.id})" class="btn btn-danger">Delete</a>
                              </div>
                              `;
    }
    
  }
  document.getElementById('numberOfIssue').innerText = ` (${numberOfIssueOpened} / ${issues.length}) `;
}
