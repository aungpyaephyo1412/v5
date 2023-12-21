import { NavigateLink, ProjectCard } from '@/components';
import { getProjectByLimit } from '@/actions';
const Project = async () => {
  const projects = await getProjectByLimit();
  return (
    <div data-section='' className=' pt-[25px]  lg:pt-[5rem]' id='projects'>
      <div className='sticky top-0 z-20 mb-4 w-full bg-slate-950/75 py-5 backdrop-blur lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only'>
          Projects
        </h2>
      </div>
      <ul className='group/list'>
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
      <div>
        <NavigateLink
          download={false}
          link={'/projects'}
          content={'view all my projects'}
        />
      </div>
    </div>
  );
};
export default Project;
