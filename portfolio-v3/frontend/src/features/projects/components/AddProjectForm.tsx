import { Action } from "@/types";
import { useState, FormEvent, useEffect } from "react";

type Project = {
  id: string; // UUID er en streng
  title: string;
  tags: string[];
  description: string;
};

type ProjectFormProps = {
  toggleForm: () => void;
  handleProjectMutation: (action: Action, project: Partial<Project>) => void;
};

export default function AddProjectForm(props: ProjectFormProps) {
  const { toggleForm, handleProjectMutation } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (formSubmitted) {
      toggleForm();
      setFormSubmitted(false);
    }
  }, [formSubmitted, toggleForm]);

  const updateTitle = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setTitle(input.value);
  };

  const updateTags = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const tagsArray = input.value.split(",").map(tag => tag.trim());
    setTags(tagsArray);
  };

  const updateDescription = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setDescription(input.value);
  };

  const addProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Sjekk at alle feltene er fylt ut
    if (!title || !tags.length || !description) return;

    // Kall til handleProjectMutation
    handleProjectMutation("add", { title, tags, description });

    // Reset formfeltene
    setTitle("");
    setTags([]);
    setDescription("");

    // Sett formSubmitted til true for å trigge toggleForm
    setFormSubmitted(true);
  };

  return (
    <article id="projectFormContainer">
      <div id="formHeader">
        <h2>Legg til nytt prosjekt</h2>
        <button id="cancelFormButton" onClick={toggleForm}>Avbryt</button>
      </div>
      <form className="form" id="projectForm" onSubmit={addProject}>
        <div id="title">
          <label htmlFor="title">Tittel</label>
          <input type="text" id="title" name="title" onChange={updateTitle} value={title} required />
        </div>
        <div id="tags">
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" name="tags" onChange={updateTags} value={tags.join(", ")} required />
        </div>
        <div id="description">
          <label htmlFor="description">Beskrivelse</label>
          <input type="text" id="description" name="description" onChange={updateDescription} value={description} required />
        </div>
        <div id="coverImage">
          <label htmlFor="coverImage">Bilde</label>
          <input type="file" id="coverImage" name="coverImage" />
        </div>
        <button type="submit">Legg til</button>
      </form>
    </article>
  );
}
