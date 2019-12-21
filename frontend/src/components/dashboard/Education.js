import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = (props) => {
  const educations = props.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>{edu.fieldofstudy}</td>
      <td>{edu.location}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
          edu.to === null ? ('Now') : (
            <Moment>{edu.to}</Moment>)
        }
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  ))
  return (
    <div>
      <h2>Educations Credentials</h2>
      <table>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>Location</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educations}
        </tbody>
      </table>
    </div>
  );
}

export default connect()(Education);
