import { Spinner } from '@/components/global/loader/spinner';

const AuthLoading = () => {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<Spinner color='#fff' />
		</div>
	);
};

export default AuthLoading;
