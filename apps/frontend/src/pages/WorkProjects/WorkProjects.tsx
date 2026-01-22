import { MainImage } from '@/components/MainImage/MainImage.tsx';
import { Title } from '@/components/Title/Title.tsx';
import { Route } from '@/routes/our-work.tsx';
import type { WorkProject } from '@/types/workProject.ts';
import { card, cardBody, cardGrid, cardImage, cardLink, cardName, container, header } from './WorkProjects.css.ts';

export const WorkProjectsPage = () => {
  const { initial } = Route.useLoaderData();
  const projects = initial.data;

  return (
    <article className={container}>
      <header className={header}>
        <Title>Our Work</Title>
      </header>
      <div className={cardGrid}>
        {projects.map((project: WorkProject) => (
          <div key={project._id} className={card}>
            {project.mainImage ? (
              <div className={cardImage}>
                <MainImage image={project.mainImage} />
              </div>
            ) : null}
            <h3 className={cardName}>{project.name}</h3>
            <p className={cardBody}>{project.description}</p>
            {project.link ? (
              <a href={project.link.url} className={cardLink} target="_blank" rel="noopener noreferrer">
                {project.link.label}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
};
