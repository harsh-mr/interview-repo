

export const Table = (props) => {
    return (
      <table style={{    margin:"auto"}}>
        <thead>
          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>COUNTRY</td>
            <td>AGE </td>
            <td>SCHOOLID </td>
            <td>SCHOOL NAME </td>
            <td>SCHOOL ADDRESS </td>
            <td>CHAIR </td>
            <td>AC </td>
            <td>FOOD </td>
          </tr>
        </thead>
        <tbody>
          {props.results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.name}</td>
              <td>{result.country}</td>
              <td>{result.age}</td>
              <td>{result.SchoolID}</td>
              <td>{result.schoolName}</td>
              <td>{result.schoolAddress}</td>
              <td>{result.chair}</td>
              <td>{result.ac}</td>
              <td>{result.food}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };