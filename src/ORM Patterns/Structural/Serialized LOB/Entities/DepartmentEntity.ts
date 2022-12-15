type DepartmentEntity = {
  name: string | null
  parent: DepartmentEntity | null
}

export default DepartmentEntity;
