import { getAllUserVideos, getFolderInfo } from '@/actions/workspace';
import FolderInfo from '@/components/global/folders/folder-info';
import Videos from '@/components/global/videos';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

type Props = {
	params: {
		folderId: string;
		workspaceId: string;
	};
};

const Page = async ({ params: { folderId, workspaceId } }: Props) => {
	const query = new QueryClient();

	await query.prefetchQuery({
		queryKey: ['folder-videos'],
		queryFn: () => getAllUserVideos(folderId),
	});

	await query.prefetchQuery({
		queryKey: ['folder-info'],
		queryFn: () => getFolderInfo(folderId),
	});

	return (
		<HydrationBoundary state={dehydrate(query)}>
			<>
				<FolderInfo folderId={folderId} />
				<Videos
					folderId={folderId}
					workspaceId={workspaceId}
					videoKey='folder-videos'
				/>
			</>
		</HydrationBoundary>
	);
};

export default Page;
