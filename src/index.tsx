import { Context, Schema } from 'koishi';
import { getTrending, Repository } from './api';

export const name = 'github-trending';

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

const formatRepo = (repo: Repository) => {
  return (
    <>
      <h3>
        {repo.author} / {repo.name}
      </h3>
      <p>
        Star: {repo.stars} | Lang: {repo.language}
      </p>
      <p>{repo.description}</p>
      <p>{repo.url}</p>
    </>
  );
};

export function apply(ctx: Context) {
  // get trending default
  ctx.command('ghtd').action(async ({ session }) => {
    await getTrending().then((res) => {
      console.log(res);
      res.forEach((repo) => {
        session.send(formatRepo(repo));
      });
    });
  });
}
