'use client';
import { getAllUserVideos } from '@/actions/workspace';
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone';
import { useQueryData } from '@/hooks/useQueryData';
import { cn } from '@/lib/utils';
import { VideosProps } from '@/types/index.type';
import VideoCard from './video-card';

type Props = {
	folderId: string;
	videosKey: string;
	workspaceId: string;
};

const mockVideo = {
	User: {
		firstname: 'John',
		lastname: 'Doe',
		image: 'https://example.com/johndoe.jpg',
	},
	id: 'video1',
	processing: false,
	Folder: {
		id: 'folder1',
		name: 'Sample Folder',
	},
	createdAt: new Date('2023-01-01T00:00:00Z'),
	title: 'Sample Video',
	source: 'https://example.com/samplevideo.mp4',
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
	//WIP: Add videos logic
	const { data: videoData } = useQueryData([videosKey], () =>
		getAllUserVideos(folderId)
	);
	const { status: videosStatus, data: videos } = videoData as VideosProps;

	return (
		<div className='flex flex-col gap-4 mt-4 '>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<VideoRecorderDuotone />
					<h2 className='text-[#BdBdBd] text-xl'>Videos</h2>
				</div>
			</div>
			<section
				className={cn(
					videosStatus !== 200
						? 'p-5'
						: 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
				)}
			>
				{/* {videosStatus === 200 ? (
					videos.map((video) => <VideoCard />)
				) : (
					<p className='text-[#BdBdBd]'>No Videos in Workspace</p>
				)} */}
				<VideoCard workspaceId={workspaceId} {...mockVideo} />
			</section>
		</div>
	);
};

export default Videos;
