// Adicionar novos itens na aba de projetos
const projects = document.querySelector(".projects_section");


// carregar projetos pelo Data.Json
function loadProjects(data) {
    fetch('javaScript/data.json')
    .then(response => response.json())
    .then(data => {
        let html = '';
        data.forEach(element => {
            html += `
            <div class="projects">
                <div class="project">
                    <img src="${element.image}">
                    <h1>${element.name}</h1>
                    <p>${element.description}</p>
                    <a href="${element.link}" target="_blank"><button type="button" >Acessar projeto</button></a>
                </div>
            </div>
            `;

        });
        projects.innerHTML = html;
    })
}



// Carregar Projetos pelo banco de dados
function getProjects(){
    let url = '/getprojects'

    let xhttp = new XMLHttpRequest()
    xhttp.open("get", url, false)
    xhttp.send()

    let data = JSON.parse(xhttp.responseText)

    let html = '';
        data.forEach(element => {
            console.log(element)
            html += `
            <div class="projects">
                <div class="project">
                    <img src="${element.image}">
                    <h1>${element.name}</h1>
                    <p>${element.description}</p>
                    <a href="${element.link}" target="_blank"><button type="button" >Acessar projeto</button></a>
                </div>
            </div>
            `;

        });
        projects.innerHTML = html;
}


// adicionar novo projeto no banco de dados
function Add_proj(){
    let url = '/insertdata';

    var image = document.getElementById('proj_image').value; 
    var name = document.getElementById('proj_name').value; 
    var description = document.getElementById('proj_description').value; 
    var link = document.getElementById('proj_link').value; 

    $.ajax({
        type: "post",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "image": image,
                "name": name,
                "description": description,
                "link": link
            }
        )
    });
    getEmpPage();

        
}




if (window.location.href == "https://lphbackspace.github.io/site_curriculo/public/index.html") {
    loadProjects()
} else {
    getProjects()
}