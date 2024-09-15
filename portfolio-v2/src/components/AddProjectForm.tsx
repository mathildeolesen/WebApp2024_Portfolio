export default function AddProjectForm() {

    return (
        <article id="projectFormContainer">
          <div id="formHeader">
            <h2>Legg til nytt prosjekt</h2>
            <button id="cancelFormButton">Avbryt</button>
          </div>
          <form id="projectForm">
            <div id="title">
              <label htmlFor="title">Tittel</label>
              <input type="text" id="title" name="title" required/>
            </div>
            <div id="tags">
              <label htmlFor="tags">Tags</label>
              <input type="text" id="tags" name="tags" required/>
            </div>
            <div id="description">
              <label htmlFor="description">Beskrivelse</label>
              <input type="text" id="description" name="description" required/>
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