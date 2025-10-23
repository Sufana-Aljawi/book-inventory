export interface AssignRole{
    email : string;
    role : 'Admin' | 'Editor' | 'Viewer';
}
export interface AssignRoleResponse {
  message: string;
  userId: string;
  assignedRole: string;
}