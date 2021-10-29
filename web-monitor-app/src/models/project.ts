import { Project } from '@/services/typings'
import { useState } from 'react'

export default function useProjectModel() {
  const [currProject, setCurrProject] = useState<Project>();

  return {
    currProject, setCurrProject
  }
}