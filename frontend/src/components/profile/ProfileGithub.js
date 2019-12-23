import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({username, getGithubRepos, repos}) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos]);
  console.log(repos);
  return (
    <div>
      <h2>Github Repos</h2>
      {repos && repos.map(repo => (
        <div key={repo.id}>
          <div>
          <h4>
              <a
                style={{color: "black"}}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p> 
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
