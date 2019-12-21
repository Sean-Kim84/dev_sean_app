import React from 'react';
import Moment from 'react-moment';

const Experience = (props) => {
  const experiences = props.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {
          exp.to === null ? ('Now') : (
            <Moment>{exp.to}</Moment>)
        }
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  ))
  return (
    <div>
      <h2>Experience Credentials</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </div>
  );
}


export default Experience;
