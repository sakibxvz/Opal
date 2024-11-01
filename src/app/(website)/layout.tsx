import React from 'react';
import LandingPageNavbar from './_components/navbar';

type Props = {
	childern: React.ReactNode;
};

const Layout = ({ childern }: Props) => {
	return (
        <div className='flex flex-col py-1o px-10 xl:px-0 container'>
            <LandingPageNavbar />
			{childern}
		</div>
	);
};

export default Layout;
