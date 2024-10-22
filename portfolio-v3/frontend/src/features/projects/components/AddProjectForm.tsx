import { Action, Project } from "@/types";
import { useState, FormEvent, useEffect } from "react";

type ProjectFormProps = {
  toggleForm: () => void;
  handleProjectMutation: (action: Action, project: Partial<Project>) => void;
};

export default function AddProjectForm(props: ProjectFormProps) {
  const { toggleForm, handleProjectMutation } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [tagsWarning, setTagsWarning] = useState(false);

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

  const updateCurrentTag = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setCurrentTag(input.value);
    if (tagsWarning) setTagsWarning(false);
  };

  const handleKeyDownTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentTag.trim()) {
      setTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag("");
      event.preventDefault();
    }
  };

  const updateDescription = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setDescription(input.value);
  };

  const updateCreatedAt = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);
    setCreatedAt(date.toISOString());
  };

  const addProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !description || !createdAt) return;
    if (tags.length === 0) {
      setTagsWarning(true);
      return;
    }

    handleProjectMutation("add", { title, tags, description, createdAt });

    setTitle("");
    setTags([]);
    setDescription("");
    setCreatedAt("");
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
          <label htmlFor="tags">Tags (trykk Enter for å legge til)</label>
          <input type="text" id="tags" name="tags" onChange={updateCurrentTag} onKeyDown={handleKeyDownTag} value={currentTag}/>
          {tagsWarning && <p className="warning">Vennligst legg til minst én tag.</p>}
          <div id="tagList">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => setTags(tags.filter((_, i) => i !== index))}>
                  <div className="remove-icon">❌</div>
                </button>
              </span>
            ))}
          </div>
        </div>
        <div id="description">
          <label htmlFor="description">Beskrivelse</label>
          <input type="text" id="description" name="description" onChange={updateDescription} value={description} required />
        </div>
        <div id="createdAt">
          <label htmlFor="createdAt">Dato</label>
          <input type="date" id="createdAt" name="createdAt" onChange={updateCreatedAt} value={createdAt.substring(0, 10)} required />
        </div>
        <button type="submit">Legg til</button>
      </form>
      <style>
        {}
      </style>
    </article>
  );
}
