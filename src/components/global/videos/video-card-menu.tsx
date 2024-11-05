'use client';

import { Move } from 'lucide-react';
import Modal from '../modal';
import ChangeVideoLocation from '@/components/forms/change-video-location';

type Props = {
	videoId: string;
	currentWorkspace?: string;
	currentFolder?: string;
	currentFolderName?: string;
};

const CardMenu = ({
	videoId,
	currentFolder,
	currentFolderName,
	currentWorkspace,
}: Props) => {
	return (
		<Modal
			clssName='flex items-center cursor-pointer gap-x-2'
			description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nemo minima eveniet delectus, ipsa temporibus.'
			title='Move to new workspace or folder'
			trigger={<Move className='text-[#a4a4a4]' size={20} fill='#a4a4a4' />}
		>
			<ChangeVideoLocation
				// videoId={videoId}
				// currentFolder={currentFolder}
				// currentFolderName={currentFolderName}
				// currentWorkspace={currentWorkspace}
			/>
		</Modal>
	);
};

export default CardMenu;
