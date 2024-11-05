import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useMoveVideos } from '@/hooks/useFolders';

type Props = {
	videoId: string;
	currentFolder?: string;
	currentWorkSpace?: string;
	currentFolderName?: string;
};

const ChangeVideoLocation = ({
	videoId,
	currentFolder,
	currentFolderName,
	currentWorkSpace,
}: Props) => {
	const {
		onFormSubmit,
		errors,
		register,
		isPending,
		folders,
		workspaces,
		isFetching,
		isFolders,
	} = useMoveVideos(videoId, currentWorkSpace!);

	const folder = folders.find((folder) => folder.id === currentFolder);
	const workspace = workspaces.find(
		(workspace) => workspace.id === currentWorkSpace
	);
	return (
		<form className='flex flex-col gap-y-5'>
			<div className='border-[1px] rounded-xl p-5'>
				<h2 className='text-xs mb-5 text-[#a4a4a4]'>Current</h2>
				<p className='text-[#a4a4a4]'>Workspcae</p>
				<p className='text-[#a4a4a4]'>This video has no folder</p>
			</div>
			<Separator orientation='horizontal' />
			<div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xl'>
				<h2 className='text-xs text-[#a4a4a4]'>To</h2>
				<Label>
					<p className='text-xs'>Workspace</p>
					<select className='rounded-xl text-base bg-transparent'>
						<option className='text-[#a4a4a4]' value='something'>
							workspace
						</option>
					</select>
				</Label>
			</div>
		</form>
	);
};

export default ChangeVideoLocation;
