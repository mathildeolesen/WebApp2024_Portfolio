type StudentProps = {
  student: {
    firstName: string,
    lastName: string,
    degree: string,
    degreeFinished: number,
    email: string
  }
}

export default function WelcomeCard(props: StudentProps) {

  const { student } = props;

    return (
        <section id="welcome">
        <figure>
          <img src="https://placehold.co/200"/>
        </figure>
        <article>
          <h1>Hei! Jeg heter {student.firstName} 🙂</h1>
          <p>
            Jeg tar for tiden en {student.degree}, og er uteksaminert i {student.degreeFinished}!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nunc ante elit, tempus eu est et, cursus laoreet elit. 
            Quisque vitae  facilisis elit. 
            </p>
        </article>
      </section>
    )
}