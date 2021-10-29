import { Project } from '@/services/typings'
import { useState } from 'react'
import { history } from 'umi';

export default function useProject() {
  const state = history.location.state as Project;
  if(!state) {
    history.push('/project');
  }
  const [currProject, setCurrProject] = useState<Project>(state);

  const getCurrProject = (): Project => {
    if(!currProject) {
      history.push('/project');
    }

    return currProject;
  }

  return {
    currProject,
    setCurrProject,
    getCurrProject
  }
}