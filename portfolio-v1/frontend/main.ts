import './style.css';
import { z } from "zod";
import { Project, ProjectArraySchema, ProjectSchema } from '../backend/types';

const projects: Project[] = [];

// Open/close AddProjectForm

// Fetch projects from server
const fetchProjectsFromJson = () => {
    fetch('http://localhost:3999/projects', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })

    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    })

    .then(data => {
        try {
            const validatedData = ProjectArraySchema.parse(data);
            
            projects.push(...validatedData.projects);
            renderProjectsDisplay();
        } catch (error) {
                console.error("Uventet feil ved validering av data:", error);
        }
    })
    .catch(error => {
        console.error('Failed to fetch projects:', error);
    });
};

// Render projects to the display
function renderProjectsDisplay() {
    const id = document.getElementById("projectsContainer");
    if (!id) return;
    id.innerHTML = ''; // Clear existing projects before rendering new ones

    console.log(projects)
    for (const project of projects) {

        console.log(project)
        const article = document.createElement("article");
        article.classList.add("displayCard");

        article.innerHTML = `
            <figure>
                <img src="${project.coverImage 
                            ? project.coverImage 
                            : 'https://placehold.co/400'}" 
                            alt="${project.title}" />
            </figure>
            <div id="displayCardInfo">
                <h3>${project.title}</h3>
                <div id="tags">
                    <span id="hashtag">#</span>
                    <ul id="tags">
                        ${project.tags.map((tag: string) => `<li>${tag}</li>`).join('')}
                    </ul>
                </div>
                <p>${project.description}</p>
            </div>
        `;

        id.appendChild(article);
    }
};

const projectForm = document.getElementById('projectForm') as HTMLFormElement;
const showFormButton = document.getElementById('showFormButton') as HTMLButtonElement;
const projectFormContainer = document.getElementById('projectFormContainer') as HTMLElement;
const cancelFormButton = document.getElementById('cancelFormButton') as HTMLButtonElement;
const displaySection = document.getElementById('display') as HTMLElement;

// Adds new project from form via POST
projectForm.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();

    projectFormContainer.style.display = 'none';

    const newProject = {
        id: crypto.randomUUID(),
        title: (
            (event.target as HTMLFormElement)
            .elements.namedItem("title") as HTMLInputElement
        )?.value,
        coverImage: (
            (event.target as HTMLFormElement)
            .elements.namedItem("coverImage") as HTMLInputElement
        )?.value || undefined,
        tags: (
            (event.target as HTMLFormElement)
            .elements.namedItem("tags") as HTMLInputElement
        )?.value.split(',').map(tag => tag.trim()),
        description: (
            (event.target as HTMLFormElement)
            .elements.namedItem("description") as HTMLInputElement
        )?.value,
    }

    

    try {
        const response = await fetch("http://localhost:3999/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        });

        const responseBody = await response.json(); // Hent responsbodyen for logging
    
        if (response.status === 201) {
            
            projects.push(newProject);
            projectForm.reset();

            // Hides the form after submit
            projectFormContainer.style.display = 'none';

            renderProjectsDisplay();
        } else {
          console.error("Feil ved lagring av vane på serveren", response.status, responseBody);
        }
      } catch (error) {
        console.error("Feil ved sending av data til serveren:", error);
      }
});

showFormButton.addEventListener('click', () => {
    if (projectFormContainer.style.display === 'none' || projectFormContainer.style.display === '') {
        
        // When the form is showing, projectFormContainer needs flex for its layout:
        projectFormContainer.style.display = 'flex'; //

        // Making sure the child (projectFormContainer)'s position is relative to displaySection's position.
        displaySection.style.position = 'relative';

    } else {
        // Hide form
        projectFormContainer.style.display = 'none';

        // Remove relative position
        displaySection.style.position = 'static';

    }
});

cancelFormButton.addEventListener('click', () => {
    // Skjul skjemaet og endre knappen tilbake til "Legg til prosjekt"
    projectFormContainer.style.display = 'none';
    displaySection.style.position = 'static';
    displaySection.style.zIndex = 'auto';
});


fetchProjectsFromJson();