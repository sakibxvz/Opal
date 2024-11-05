'use client';
import { getWorkSpaces } from '@/actions/workspace';
import { useQueryData } from '@/hooks/useQueryData';
import Modal from '../modal';
import { Button } from '@/components/ui/button';
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone';
import WorkspaceForm from '../../forms/workspace-form';

const CreateWorkspace = () => {
	const { data } = useQueryData(['user-workspaces'], getWorkSpaces);

	const { data: plan } = data as {
		status: number;
		data: {
			suscription: {
				plan: 'PRO' | 'FREE';
			} | null;
		};
	};
	if (plan.suscription?.plan === 'FREE') {
		<></>;
	}
	if (plan.suscription?.plan === 'PRO')
		return (
			<Modal
				title='Create a Workspace'
				description='Workspaces helps you collaborate with team members.'
				trigger={
					<Button className='bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
						<FolderPlusDuotine />
						Create a Workspace
					</Button>
				}
			>
				<WorkspaceForm />
			</Modal>
		);
};

export default CreateWorkspace;
