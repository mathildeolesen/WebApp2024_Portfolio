import { useState,FormEvent, useEffect, Dispatch } from "react"

type Project = {

  id: string, // UUID er en streng
  title: string,
  tags: string[],
  description: string
}

type ProjectFormProps = {
  toggleForm: () => void,
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

export default function AddProjectForm(props: ProjectFormProps) {
  const { toggleForm, setProjects } = props;

  // toggleForm is a funksjon that has no parameters () and no return => void

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // toggleForm wouldnt trigger properly when inside addProject.
  // If toggleForm was placed inside addProject, even at last, setProjects wouldnt work. No new project.
  useEffect(() => {
    if (formSubmitted) {
      toggleForm();
      setFormSubmitted(false);
    }
  }, [formSubmitted, toggleForm])

  const updateTitle = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setTitle(input.value)
  };

  const updateTags = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const tags = (input.value).toString().split(",").map(tag => tag.trim());
    setTags(tags)
  };

  const updateDescription = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setDescription(input.value)
  };


  const addProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) return;

    if (!tags) return;

    if(!description) return;

    const form = event.target as HTMLFormElement | null;

    if (!form) return;

    setProjects((prevProjects) => [
      ...prevProjects, 
      {id: crypto.randomUUID(), title, tags, description}
    ])

    setTitle("");
    setTags([]);
    setDescription("");

    setFormSubmitted(true);
  };

  // Form-handling with FormData and formdata.get() -> ! Old !
  /* 
  const addProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement | null;

    if (!form) return;

    const formData = new FormData(form);
    const title = formData.get("title");
    if (!title || typeof title !== "string") return;

    const tagsString = formData.get("tags");
    if (!tagsString || typeof tagsString !== "string") return;

    const tags = tagsString.split(",").map(tag => tag.trim());

    const description = formData.get("description");
    if (!description || typeof description !== "string") return;

    setProjects((prevProjects) => [
      ...prevProjects,
      { id: crypto.randomUUID(), title, tags, description },
    ]);

    form.reset();

    setFormSubmitted(true);
  }
    */


    return (
        <article id="projectFormContainer">
          <div id="formHeader">
            <h2>Legg til nytt prosjekt</h2>
            <button id="cancelFormButton" onClick={toggleForm}>Avbryt</button>
          </div>
          <form id="projectForm" onSubmit={addProject}>
            <div id="title">
              <label htmlFor="title">Tittel</label>
              <input type="text" id="title" name="title" 
                onChange={updateTitle} value={title} required/>
            </div>
            <div id="tags">
              <label htmlFor="tags">Tags</label>
              <input type="text" id="tags" name="tags" 
              onChange={updateTags} value={tags} required/>
            </div>
            <div id="description">
              <label htmlFor="description">Beskrivelse</label>
              <input type="text" id="description" name="description" 
              onChange={updateDescription} value={description} required/>
            </div>
            <div id="coverImage">
              <label htmlFor="coverImage">Bilde</label>
              <input type="file" id="coverImage" name="coverImage"/>
            </div>
            <button type="submit">Legg til</button>
          </form>
         </article>
    )
}