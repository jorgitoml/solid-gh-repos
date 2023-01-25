import { Component } from 'solid-js';
import { savedRepos, setSavedRepos } from '../pages/SavedRepos';

export type Repo = {
  id: string;
  html_url: string;
  name: string;
  description: string;
  stargazers_count: string;
  owner: {
    login: string;
  };
};

interface Props {
  repo: Repo;
}

const saveRepo = (repo: Repo) => {
  setSavedRepos([...savedRepos(), repo]);
};

const unsaveRepo = (repoId: string) => {
  const nextState = savedRepos()?.filter((item) => item.id !== repoId);
  setSavedRepos(nextState);
};

const isRepoSaved = (repoId: string) => {
  const repo = savedRepos()?.filter((item) => item.id === repoId);
  return !!repo?.length;
};

const RepoCard: Component<Props> = ({ repo }) => {
  return (
    <div class="card">
      <div class="card-header">&#11088; stars: {repo.stargazers_count}</div>
      <div class="card-body">
        <a
          href={repo.html_url}
          class="h4 card-title text-decoration-none"
          target="_blank"
          rel="noreferrer"
        >
          <strong>{repo.owner?.login}</strong>/{repo.name}
        </a>
        <p class="card-text">{repo.description}</p>

        {!isRepoSaved(repo.id) ? (
          <button class="btn btn-success" onClick={() => saveRepo(repo)}>
            Save
          </button>
        ) : (
          <button class="btn btn-danger" onClick={() => unsaveRepo(repo.id)}>
            Unsave
          </button>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
